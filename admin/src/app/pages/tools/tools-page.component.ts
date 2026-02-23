import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApiService, Tool } from '../../services/admin-api.service';

@Component({
  selector: 'app-tools-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <div class="page-header">
        <div>
          <h1>Tools & Systems</h1>
          <p>Manage the tools displayed on your website</p>
        </div>
        <button class="btn btn-primary" (click)="showForm = true; resetForm()">+ Add Tool</button>
      </div>

      <!-- Modal -->
      <div class="modal-overlay" *ngIf="showForm" (click)="cancelForm()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{ editingId ? 'Edit' : 'Add New' }} Tool</h2>
            <button class="close-btn" (click)="cancelForm()">✕</button>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Tool Name *</label>
              <input type="text" [(ngModel)]="form.name" placeholder="e.g. Notion">
            </div>
            <div class="form-group">
              <label>Category *</label>
              <input type="text" [(ngModel)]="form.category" placeholder="e.g. Project Management">
            </div>
          </div>
          <div class="form-group">
            <label>Display Order</label>
            <input type="number" [(ngModel)]="form.order">
          </div>
          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" [(ngModel)]="form.isVisible">
              <span>Visible on website</span>
            </label>
          </div>
          <div class="modal-actions">
            <button class="btn btn-secondary" (click)="cancelForm()">Cancel</button>
            <button class="btn btn-primary" (click)="save()" [disabled]="saving">
              {{ saving ? 'Saving...' : (editingId ? 'Update' : 'Add') }} Tool
            </button>
          </div>
        </div>
      </div>

      <div class="loading" *ngIf="loading">Loading tools...</div>
      <div class="error-banner" *ngIf="error">⚠️ Could not connect to backend. Make sure NestJS server is running on port 3000.</div>

      <div class="tools-grid" *ngIf="!loading">
        <div class="tool-item" *ngFor="let t of tools">
          <div class="tool-info">
            <strong>{{ t.name }}</strong>
            <span>{{ t.category }}</span>
          </div>
          <div class="tool-actions">
            <span class="badge" [class.badge-green]="t.isVisible" [class.badge-red]="!t.isVisible">
              {{ t.isVisible ? 'Visible' : 'Hidden' }}
            </span>
            <button class="btn btn-secondary btn-sm" (click)="edit(t)">Edit</button>
            <button class="btn btn-danger btn-sm" (click)="delete(t.id)">Delete</button>
          </div>
        </div>
        <div class="empty" *ngIf="tools.length === 0 && !error">
          <span>🔧</span><p>No tools yet. Add your first one!</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { max-width: 900px; }
    .page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 32px; gap: 16px; flex-wrap: wrap;
      h1 { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #0f1e47; margin-bottom: 4px; }
      p { color: #6b7a99; }
    }
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
    .modal { background: white; border-radius: 16px; padding: 32px; width: 100%; max-width: 480px; }
    .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;
      h2 { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: #0f1e47; }
    }
    .close-btn { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #6b7a99; padding: 4px 8px; border-radius: 6px; &:hover { background: #f5f7ff; } }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .checkbox-label { display: flex; align-items: center; gap: 10px; cursor: pointer; font-weight: 600; input { width: auto; } }
    .modal-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px; }
    .tools-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
    .tool-item { background: white; border-radius: 12px; padding: 18px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 12px rgba(26,47,107,0.06); gap: 12px; flex-wrap: wrap; }
    .tool-info { strong { display: block; color: #0f1e47; margin-bottom: 2px; } span { color: #6b7a99; font-size: 0.8rem; } }
    .tool-actions { display: flex; align-items: center; gap: 8px; }
    .btn-sm { padding: 6px 14px; font-size: 0.8rem; }
    .loading { text-align: center; padding: 60px; color: #6b7a99; }
    .error-banner { background: #fff0f0; border: 1px solid #ffcdd2; border-radius: 10px; padding: 16px 20px; color: #e53e3e; margin-bottom: 24px; font-size: 0.9rem; }
    .empty { text-align: center; padding: 60px; color: #6b7a99; background: white; border-radius: 12px; grid-column: 1 / -1;
      span { display: block; font-size: 2rem; margin-bottom: 12px; }
    }
    .badge { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
    .badge-green { background: #f0fff4; color: #38a169; }
    .badge-red { background: #fff0f0; color: #e53e3e; }
    @media (max-width: 600px) { .tools-grid { grid-template-columns: 1fr; } }
  `]
})
export class ToolsPageComponent implements OnInit {
  tools: Tool[] = [];
  loading = true; error = false; showForm = false; editingId: number | null = null; saving = false;
  form: Partial<Tool> = { name: '', category: '', isVisible: true, order: 0 };

  constructor(private api: AdminApiService) {}
  ngOnInit() { this.load(); }
  load() { this.loading = true; this.error = false; this.api.getTools().subscribe({ next: t => { this.tools = t; this.loading = false; }, error: () => { this.loading = false; this.error = true; } }); }
  resetForm() { this.editingId = null; this.form = { name: '', category: '', isVisible: true, order: this.tools.length + 1 }; }
  edit(t: Tool) { this.editingId = t.id; this.form = { ...t }; this.showForm = true; }
  save() {
    if (!this.form.name || !this.form.category) { alert('Please fill in all fields.'); return; }
    this.saving = true;
    const call = this.editingId ? this.api.updateTool(this.editingId, this.form) : this.api.createTool(this.form);
    call.subscribe({ next: () => { this.saving = false; this.showForm = false; this.load(); }, error: () => { this.saving = false; alert('Error saving.'); } });
  }
  delete(id: number) { if (!confirm('Delete this tool?')) return; this.api.deleteTool(id).subscribe({ next: () => this.load(), error: () => alert('Error deleting.') }); }
  cancelForm() { this.showForm = false; }
}

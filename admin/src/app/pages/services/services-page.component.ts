import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApiService, Service } from '../../services/admin-api.service';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <div class="page-header">
        <div>
          <h1>Services</h1>
          <p>Manage the services displayed on your website</p>
        </div>
        <button class="btn btn-primary" (click)="showForm = true; resetForm()">+ Add Service</button>
      </div>

      <!-- Modal -->
      <div class="modal-overlay" *ngIf="showForm" (click)="cancelForm()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{ editingId ? 'Edit' : 'Add New' }} Service</h2>
            <button class="close-btn" (click)="cancelForm()">✕</button>
          </div>
          <div class="form-group">
            <label>Service Title *</label>
            <input type="text" [(ngModel)]="form.title" placeholder="e.g. Administrative Support">
          </div>
          <div class="form-group">
            <label>Description *</label>
            <textarea [(ngModel)]="form.description" placeholder="Describe what this service includes..." rows="4"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Icon</label>
              <select [(ngModel)]="form.icon">
                <option value="clipboard-list">📋 Administrative</option>
                <option value="headphones">🎧 Support/Communication</option>
                <option value="calendar">📅 Calendar/Scheduling</option>
                <option value="database">🗄️ Data/Research</option>
                <option value="chart">📊 Analytics</option>
                <option value="mail">✉️ Email</option>
              </select>
            </div>
            <div class="form-group">
              <label>Order</label>
              <input type="number" [(ngModel)]="form.order" placeholder="1, 2, 3...">
            </div>
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
              {{ saving ? 'Saving...' : (editingId ? 'Update' : 'Add') }} Service
            </button>
          </div>
        </div>
      </div>

      <div class="loading" *ngIf="loading">Loading services...</div>
      <div class="error-banner" *ngIf="error">⚠️ Could not connect to backend. Make sure NestJS server is running on port 3000.</div>

      <div class="items-list" *ngIf="!loading">
        <div class="item" *ngFor="let s of services">
          <div class="item-icon">{{ getIcon(s.icon) }}</div>
          <div class="item-info">
            <strong>{{ s.title }}</strong>
            <p>{{ s.description }}</p>
          </div>
          <div class="item-actions">
            <span class="badge" [class.badge-green]="s.isVisible" [class.badge-red]="!s.isVisible">
              {{ s.isVisible ? 'Visible' : 'Hidden' }}
            </span>
            <button class="btn btn-secondary btn-sm" (click)="edit(s)">Edit</button>
            <button class="btn btn-danger btn-sm" (click)="delete(s.id)">Delete</button>
          </div>
        </div>
        <div class="empty" *ngIf="services.length === 0 && !error">
          <span>⚙️</span>
          <p>No services yet. Add your first one!</p>
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
    .modal { background: white; border-radius: 16px; padding: 32px; width: 100%; max-width: 560px; max-height: 90vh; overflow-y: auto; }
    .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;
      h2 { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: #0f1e47; }
    }
    .close-btn { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #6b7a99; padding: 4px 8px; border-radius: 6px; &:hover { background: #f5f7ff; } }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .checkbox-label { display: flex; align-items: center; gap: 10px; cursor: pointer; font-weight: 600; input { width: auto; } }
    .modal-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px; }
    .items-list { display: flex; flex-direction: column; gap: 14px; }
    .item { background: white; border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 16px; box-shadow: 0 2px 12px rgba(26,47,107,0.06); flex-wrap: wrap; }
    .item-icon { font-size: 1.8rem; flex-shrink: 0; }
    .item-info { flex: 1; min-width: 200px;
      strong { display: block; color: #0f1e47; margin-bottom: 4px; }
      p { color: #6b7a99; font-size: 0.85rem; line-height: 1.5; }
    }
    .item-actions { display: flex; align-items: center; gap: 8px; }
    .btn-sm { padding: 6px 14px; font-size: 0.8rem; }
    .loading { text-align: center; padding: 60px; color: #6b7a99; }
    .error-banner { background: #fff0f0; border: 1px solid #ffcdd2; border-radius: 10px; padding: 16px 20px; color: #e53e3e; margin-bottom: 24px; font-size: 0.9rem; }
    .empty { text-align: center; padding: 60px; color: #6b7a99; background: white; border-radius: 12px;
      span { display: block; font-size: 2rem; margin-bottom: 12px; }
    }
    .badge { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
    .badge-green { background: #f0fff4; color: #38a169; }
    .badge-red { background: #fff0f0; color: #e53e3e; }
  `]
})
export class ServicesPageComponent implements OnInit {
  services: Service[] = [];
  loading = true; error = false; showForm = false; editingId: number | null = null; saving = false;
  form: Partial<Service> = { title: '', description: '', icon: 'clipboard-list', isVisible: true, order: 0 };
  iconMap: Record<string, string> = { 'clipboard-list': '📋', 'headphones': '🎧', 'calendar': '📅', 'database': '🗄️', 'chart': '📊', 'mail': '✉️' };

  constructor(private api: AdminApiService) {}
  ngOnInit() { this.load(); }
  load() { this.loading = true; this.error = false; this.api.getServices().subscribe({ next: s => { this.services = s; this.loading = false; }, error: () => { this.loading = false; this.error = true; } }); }
  resetForm() { this.editingId = null; this.form = { title: '', description: '', icon: 'clipboard-list', isVisible: true, order: this.services.length + 1 }; }
  edit(s: Service) { this.editingId = s.id; this.form = { ...s }; this.showForm = true; }
  save() {
    if (!this.form.title || !this.form.description) { alert('Please fill required fields.'); return; }
    this.saving = true;
    const call = this.editingId ? this.api.updateService(this.editingId, this.form) : this.api.createService(this.form);
    call.subscribe({ next: () => { this.saving = false; this.showForm = false; this.load(); }, error: () => { this.saving = false; alert('Error saving.'); } });
  }
  delete(id: number) { if (!confirm('Delete this service?')) return; this.api.deleteService(id).subscribe({ next: () => this.load(), error: () => alert('Error deleting.') }); }
  cancelForm() { this.showForm = false; }
  getIcon(icon: string) { return this.iconMap[icon] || '📌'; }
}

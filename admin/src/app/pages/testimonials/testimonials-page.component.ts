import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApiService, Testimonial } from '../../services/admin-api.service';

@Component({
  selector: 'app-testimonials-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <div class="page-header">
        <div>
          <h1>Testimonials</h1>
          <p>Manage client testimonials displayed on your website</p>
        </div>
        <button class="btn btn-primary" (click)="showForm = true; resetForm()">+ Add Testimonial</button>
      </div>

      <!-- Add / Edit Form Modal -->
      <div class="modal-overlay" *ngIf="showForm" (click)="cancelForm()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{ editingId ? 'Edit' : 'Add New' }} Testimonial</h2>
            <button class="close-btn" (click)="cancelForm()">✕</button>
          </div>
          <div class="form-group">
            <label>Client Quote *</label>
            <textarea [(ngModel)]="form.quote" placeholder="What did the client say about working with you?" rows="4"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Client Name *</label>
              <input type="text" [(ngModel)]="form.name" placeholder="e.g. Sarah Mitchell">
            </div>
            <div class="form-group">
              <label>Job Title *</label>
              <input type="text" [(ngModel)]="form.title" placeholder="e.g. Operations Manager">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Company *</label>
              <input type="text" [(ngModel)]="form.company" placeholder="e.g. Kai Concept">
            </div>
            <div class="form-group">
              <label>Display Order</label>
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
            <button class="btn btn-primary" (click)="saveTestimonial()" [disabled]="saving">
              {{ saving ? 'Saving...' : (editingId ? 'Update' : 'Add') }} Testimonial
            </button>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div class="loading" *ngIf="loading">Loading testimonials...</div>

      <!-- Error -->
      <div class="error-banner" *ngIf="error">
        ⚠️ Could not connect to backend. Make sure NestJS server is running on port 3000.
      </div>

      <!-- List -->
      <div class="testimonials-list" *ngIf="!loading">
        <div class="testimonial-item" *ngFor="let t of testimonials">
          <div class="t-header">
            <div class="t-avatar">{{ getInitials(t.name) }}</div>
            <div class="t-meta">
              <strong>{{ t.name }}</strong>
              <span>{{ t.title }} · {{ t.company }}</span>
            </div>
            <div class="t-actions">
              <span class="badge" [class.badge-green]="t.isVisible" [class.badge-red]="!t.isVisible">
                {{ t.isVisible ? 'Visible' : 'Hidden' }}
              </span>
              <button class="btn btn-secondary btn-sm" (click)="editTestimonial(t)">Edit</button>
              <button class="btn btn-danger btn-sm" (click)="deleteTestimonial(t.id)">Delete</button>
            </div>
          </div>
          <p class="t-quote">"{{ t.quote }}"</p>
        </div>
        <div class="empty" *ngIf="testimonials.length === 0 && !error">
          <span>💬</span>
          <p>No testimonials yet. Add your first one!</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { max-width: 900px; }
    .page-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 32px;
      gap: 16px;
      flex-wrap: wrap;
      h1 { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #0f1e47; margin-bottom: 4px; }
      p { color: #6b7a99; }
    }
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 200;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .modal {
      background: white;
      border-radius: 16px;
      padding: 32px;
      width: 100%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
    }
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      h2 { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: #0f1e47; }
    }
    .close-btn {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      color: #6b7a99;
      padding: 4px 8px;
      border-radius: 6px;
      &:hover { background: #f5f7ff; }
    }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      font-weight: 600;
      input { width: auto; }
    }
    .modal-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px; }
    .testimonials-list { display: flex; flex-direction: column; gap: 16px; }
    .testimonial-item {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 12px rgba(26,47,107,0.06);
    }
    .t-header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    .t-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1a2f6b, #3b5bdb);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.75rem;
      flex-shrink: 0;
    }
    .t-meta {
      flex: 1;
      strong { display: block; color: #0f1e47; font-size: 0.95rem; }
      span { color: #6b7a99; font-size: 0.8rem; }
    }
    .t-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .t-quote { color: #4a5568; font-style: italic; line-height: 1.6; font-size: 0.9rem; }
    .btn-sm { padding: 6px 14px; font-size: 0.8rem; }
    .loading { text-align: center; padding: 60px; color: #6b7a99; }
    .error-banner {
      background: #fff0f0;
      border: 1px solid #ffcdd2;
      border-radius: 10px;
      padding: 16px 20px;
      color: #e53e3e;
      margin-bottom: 24px;
      font-size: 0.9rem;
    }
    .empty {
      text-align: center;
      padding: 60px;
      color: #6b7a99;
      background: white;
      border-radius: 12px;
      span { display: block; font-size: 2rem; margin-bottom: 12px; }
    }
    .badge { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
    .badge-green { background: #f0fff4; color: #38a169; }
    .badge-red { background: #fff0f0; color: #e53e3e; }
  `]
})
export class TestimonialsPageComponent implements OnInit {
  testimonials: Testimonial[] = [];
  loading = true;
  error = false;
  showForm = false;
  editingId: number | null = null;
  saving = false;

  form: Partial<Testimonial> = { quote: '', name: '', title: '', company: '', isVisible: true, order: 0 };

  constructor(private api: AdminApiService) {}

  ngOnInit() { this.loadTestimonials(); }

  loadTestimonials() {
    this.loading = true;
    this.error = false;
    this.api.getTestimonials().subscribe({
      next: t => { this.testimonials = t; this.loading = false; },
      error: () => { this.loading = false; this.error = true; }
    });
  }

  resetForm() {
    this.editingId = null;
    this.form = { quote: '', name: '', title: '', company: '', isVisible: true, order: this.testimonials.length + 1 };
  }

  editTestimonial(t: Testimonial) {
    this.editingId = t.id;
    this.form = { ...t };
    this.showForm = true;
  }

  saveTestimonial() {
    if (!this.form.quote || !this.form.name || !this.form.title || !this.form.company) {
      alert('Please fill in all required fields.'); return;
    }
    this.saving = true;
    const call = this.editingId
      ? this.api.updateTestimonial(this.editingId, this.form)
      : this.api.createTestimonial(this.form);

    call.subscribe({
      next: () => { this.saving = false; this.showForm = false; this.loadTestimonials(); },
      error: () => { this.saving = false; alert('Error saving testimonial.'); }
    });
  }

  deleteTestimonial(id: number) {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    this.api.deleteTestimonial(id).subscribe({
      next: () => this.loadTestimonials(),
      error: () => alert('Error deleting testimonial.')
    });
  }

  cancelForm() { this.showForm = false; }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminApiService } from '../../services/admin-api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard">
      <div class="page-header">
        <h1>Dashboard</h1>
        <p>Welcome to your website management panel</p>
      </div>
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon">💬</div>
          <div class="stat-info">
            <span class="stat-num">{{ testimonialCount }}</span>
            <span class="stat-label">Testimonials</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚙️</div>
          <div class="stat-info">
            <span class="stat-num">{{ serviceCount }}</span>
            <span class="stat-label">Services</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔧</div>
          <div class="stat-info">
            <span class="stat-num">{{ toolCount }}</span>
            <span class="stat-label">Tools</span>
          </div>
        </div>
      </div>
      <div class="quick-links">
        <h2>Quick Actions</h2>
        <div class="links-grid">
          <a routerLink="/testimonials" class="quick-link">
            <span class="ql-icon">💬</span>
            <div>
              <strong>Manage Testimonials</strong>
              <p>Add, edit, or remove client testimonials</p>
            </div>
            <span class="arrow">→</span>
          </a>
          <a routerLink="/services" class="quick-link">
            <span class="ql-icon">⚙️</span>
            <div>
              <strong>Manage Services</strong>
              <p>Update the services you offer</p>
            </div>
            <span class="arrow">→</span>
          </a>
          <a routerLink="/tools" class="quick-link">
            <span class="ql-icon">🔧</span>
            <div>
              <strong>Manage Tools</strong>
              <p>Edit your tools & systems section</p>
            </div>
            <span class="arrow">→</span>
          </a>
          <a routerLink="/profile" class="quick-link">
            <span class="ql-icon">👤</span>
            <div>
              <strong>Edit Profile</strong>
              <p>Update your bio, contact info & tagline</p>
            </div>
            <span class="arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { max-width: 900px; }
    .page-header { margin-bottom: 32px; }
    h1 { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #0f1e47; margin-bottom: 4px; }
    .page-header p { color: #6b7a99; }
    .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
    .stat-card {
      background: white;
      border-radius: 14px;
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 2px 12px rgba(26,47,107,0.06);
    }
    .stat-icon { font-size: 2rem; }
    .stat-num { display: block; font-family: 'DM Serif Display', serif; font-size: 2rem; color: #0f1e47; }
    .stat-label { font-size: 0.8rem; color: #6b7a99; font-weight: 500; }
    .quick-links h2 { font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: #0f1e47; margin-bottom: 16px; }
    .links-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .quick-link {
      background: white;
      border-radius: 12px;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      text-decoration: none;
      border: 2px solid transparent;
      box-shadow: 0 2px 12px rgba(26,47,107,0.06);
      transition: all 0.2s;
      &:hover { border-color: #1a2f6b; transform: translateY(-2px); }
      .ql-icon { font-size: 1.5rem; flex-shrink: 0; }
      strong { display: block; color: #0f1e47; font-size: 0.95rem; margin-bottom: 2px; }
      p { color: #6b7a99; font-size: 0.8rem; }
      .arrow { margin-left: auto; color: #6b7a99; font-size: 1.2rem; }
    }
    @media (max-width: 600px) {
      .stats-row, .links-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class DashboardComponent implements OnInit {
  testimonialCount = 0;
  serviceCount = 0;
  toolCount = 0;

  constructor(private api: AdminApiService) {}

  ngOnInit() {
    this.api.getTestimonials().subscribe({ next: t => this.testimonialCount = t.length, error: () => {} });
    this.api.getServices().subscribe({ next: s => this.serviceCount = s.length, error: () => {} });
    this.api.getTools().subscribe({ next: t => this.toolCount = t.length, error: () => {} });
  }
}

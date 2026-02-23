import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Service } from '../../models';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="services" id="services">
      <div class="container">
        <h2 class="section-title">Services Offered</h2>
        <p class="section-subtitle">Comprehensive support solutions tailored to your business needs</p>
        <div class="services-grid">
          <div class="service-card" *ngFor="let svc of services; let i = index" [class.featured]="i === 1">
            <div class="service-icon">
              <span>{{ getIcon(svc.icon) }}</span>
            </div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.description }}</p>
          </div>
        </div>
        <!-- Fallback if API not available -->
        <div class="services-grid" *ngIf="services.length === 0 && loaded">
          <div class="service-card" *ngFor="let s of fallback; let i = index" [class.featured]="i === 1">
            <div class="service-icon"><span>{{ s.icon }}</span></div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services { background: white; padding: 100px 0; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
    .section-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(2rem, 4vw, 2.8rem);
      color: #0f1e47;
      text-align: center;
      margin-bottom: 12px;
    }
    .section-subtitle { color: #6b7a99; text-align: center; margin-bottom: 60px; }
    .services-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
    .service-card {
      padding: 36px;
      border-radius: 16px;
      border: 2px solid #e8edff;
      background: white;
      transition: all 0.3s ease;
      &:hover {
        border-color: #3b5bdb;
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(26,47,107,0.1);
      }
      &.featured {
        border-color: #1a2f6b;
        background: #f8faff;
      }
      h3 {
        font-family: 'DM Serif Display', serif;
        font-size: 1.3rem;
        color: #0f1e47;
        margin: 16px 0 12px;
      }
      p { color: #6b7a99; line-height: 1.6; font-size: 0.95rem; }
    }
    .service-icon {
      width: 52px;
      height: 52px;
      background: #f0f4ff;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
    }
    @media (max-width: 768px) {
      .services-grid { grid-template-columns: 1fr; }
      .container { padding: 0 20px; }
    }
  `]
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  loaded = false;
  fallback = [
    { icon: '📋', title: 'Administrative Support', desc: 'Streamline your operations with expert email management, document preparation, data organization, and general administrative tasks.' },
    { icon: '🎧', title: 'Customer Service & Communication', desc: 'Maintain exceptional client relationships with professional email support, inquiry management, and timely follow-ups.' },
    { icon: '📅', title: 'Scheduling & Calendar Management', desc: 'Never miss an appointment again. Meeting coordination, calendar organization, and reminder systems to optimize your time.' },
    { icon: '🗄️', title: 'Data Entry & Research', desc: 'Accurate data entry, thorough market research, competitor analysis, and information gathering for strategic decisions.' },
  ];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getServices().subscribe({
      next: s => { this.services = s; this.loaded = true; },
      error: () => { this.loaded = true; }
    });
  }

  getIcon(icon: string): string {
    const icons: Record<string, string> = {
      'clipboard-list': '📋', 'headphones': '🎧', 'calendar': '📅', 'database': '🗄️',
    };
    return icons[icon] || '📌';
  }
}

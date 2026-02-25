import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../../services/api.service";
import { Profile } from "../../models";

@Component({
  selector: "app-hero",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero" id="home">
      <div class="hero-content">
        <div class="hero-text">
          <p class="hero-eyebrow">Business Operations Consultant</p>
          <h1>
            {{
              profile?.tagline ||
                "Helping you stay organized, productive, and stress-free"
            }}
          </h1>
          <p class="hero-sub">
            {{
              profile?.title || "Professional Business Operations Consultant"
            }}
          </p>
          <div class="hero-actions">
            <a href="#contact" class="btn-primary">Let's Work Together →</a>
            <a href="#services" class="btn-secondary">View Services</a>
          </div>
        </div>
        <div class="hero-image">
          <div class="image-frame">
            <!-- Show uploaded photo if available, otherwise show placeholder -->
            <img
              *ngIf="heroImageUrl"
              [src]="heroImageUrl"
              [alt]="profile?.name || 'Winfred Mwikali'"
              class="profile-photo"
            />
            <div class="image-placeholder" *ngIf="!heroImageUrl">
              <span>{{ getInitials() }}</span>
            </div>
          </div>
          <div class="floating-card card-1">
            <span class="card-icon">✓</span>
            <span>Organized & Efficient</span>
          </div>
          <div class="floating-card card-2">
            <span class="card-icon">⚡</span>
            <span>Always On Time</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
        padding: 120px 40px 60px;
        background: white;
        position: relative;
        overflow: hidden;
        &::before {
          content: "";
          position: absolute;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(
            circle,
            rgba(59, 91, 219, 0.06) 0%,
            transparent 70%
          );
          border-radius: 50%;
        }
      }
      .hero-content {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        gap: 60px;
        width: 100%;
      }
      .hero-eyebrow {
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #3b5bdb;
        margin-bottom: 20px;
      }
      h1 {
        font-family: "DM Serif Display", serif;
        font-size: clamp(2.5rem, 5vw, 3.8rem);
        color: #0f1e47;
        line-height: 1.15;
        margin-bottom: 20px;
      }
      .hero-sub {
        font-size: 1.05rem;
        color: #6b7a99;
        margin-bottom: 40px;
      }
      .hero-actions {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
      }
      .btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #0f1e47;
        color: white;
        padding: 14px 28px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 15px;
        text-decoration: none;
        transition: all 0.2s ease;
        &:hover {
          background: #2a4494;
          transform: translateY(-2px);
        }
      }
      .btn-secondary {
        display: inline-flex;
        align-items: center;
        background: transparent;
        color: #0f1e47;
        padding: 14px 28px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 15px;
        text-decoration: none;
        border: 2px solid #e2e8f8;
        transition: all 0.2s ease;
        &:hover {
          border-color: #0f1e47;
          transform: translateY(-2px);
        }
      }
      .hero-image {
        position: relative;
        display: flex;
        justify-content: center;
      }
      .image-frame {
        width: 420px;
        height: 480px;
        border-radius: 20px;
        overflow: hidden;
        background: #f0f4ff;
        position: relative;
      }
      .profile-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
      }
      .image-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #e8edff 0%, #c5d3ff 100%);
        font-family: "DM Serif Display", serif;
        font-size: 5rem;
        color: #1a2f6b;
        opacity: 0.5;
      }
      .floating-card {
        position: absolute;
        background: white;
        border-radius: 12px;
        padding: 12px 18px;
        box-shadow: 0 8px 32px rgba(26, 47, 107, 0.14);
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        font-size: 0.85rem;
        color: #0f1e47;
        animation: float 3s ease-in-out infinite;
        .card-icon {
          font-size: 1.1rem;
        }
      }
      .card-1 {
        bottom: 40px;
        left: -20px;
        animation-delay: 0s;
      }
      .card-2 {
        top: 60px;
        right: -20px;
        animation-delay: 1.5s;
      }
      @keyframes float {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-8px);
        }
      }
      @media (max-width: 768px) {
        .hero {
          padding: 100px 20px 60px;
        }
        .hero-content {
          grid-template-columns: 1fr;
          gap: 40px;
        }
        .hero-image {
          order: -1;
        }
        .image-frame {
          width: 300px;
          height: 340px;
        }
      }
    `,
  ],
})
export class HeroComponent implements OnInit {
  profile: Profile | null = null;
  heroImageUrl: string | null = null;
  // private apiBase = "http://localhost:3000";
  private apiBase = "https://winfred-portfolio-production.up.railway.app/api";

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getProfile().subscribe({
      next: (p) => {
        this.profile = p;
        if (p.heroImage) {
          this.heroImageUrl = p.heroImage.startsWith("http")
            ? p.heroImage
            : `${this.apiBase}${p.heroImage}`;
        }
      },
      error: () => {},
    });
  }

  getInitials(): string {
    const name = this.profile?.name || "Winfred Mwikali";
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }
}

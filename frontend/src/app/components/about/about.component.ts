import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../../services/api.service";
import { Profile } from "../../models";

@Component({
  selector: "app-about",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="about" id="about">
      <div class="container">
        <div class="about-grid">
          <div class="about-visual">
            <div class="about-image-frame">
              <img
                *ngIf="aboutImageUrl"
                [src]="aboutImageUrl"
                [alt]="profile?.name || 'Winfred Mwikali'"
                class="about-photo"
              />
              <div class="about-img-placeholder" *ngIf="!aboutImageUrl">
                <span>{{ getInitials() }}</span>
              </div>
            </div>
            <div class="stats-grid">
              <div class="stat">
                <span class="stat-number">50+</span>
                <span class="stat-label">Clients Served</span>
              </div>
              <div class="stat">
                <span class="stat-number">3+</span>
                <span class="stat-label">Years Experience</span>
              </div>
              <div class="stat">
                <span class="stat-number">100%</span>
                <span class="stat-label">Client Satisfaction</span>
              </div>
            </div>
          </div>
          <div class="about-text">
            <p class="eyebrow">About Me</p>
            <h2>The Backbone of Your Business Operations</h2>
            <ng-container *ngIf="profile">
              <p>{{ profile.aboutParagraph1 }}</p>
              <p>{{ profile.aboutParagraph2 }}</p>
              <p>{{ profile.aboutParagraph3 }}</p>
            </ng-container>
            <ng-container *ngIf="!profile">
              <p>
                I'm Winfred Mwikali, a dedicated Business Operations Consultant
                with extensive experience supporting entrepreneurs, coaches, and
                busy professionals in managing their daily operations more
                efficiently.
              </p>
              <p>
                My mission is simple: to take the administrative burden off your
                shoulders so you can focus on what truly matters, growing your
                business and serving your clients.
              </p>
              <p>
                Whether it's managing your calendar, handling customer
                inquiries, or coordinating projects, I bring reliability,
                professionalism, and a proactive approach to every task.
              </p>
            </ng-container>
            <a href="#contact" class="btn-cta">Let's Work Together →</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .about {
        background: #f8faff;
        padding: 100px 0;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 40px;
      }
      .about-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 80px;
        align-items: center;
      }
      .about-visual {
        position: relative;
      }
      .about-image-frame {
        width: 100%;
        height: 380px;
        border-radius: 20px;
        overflow: hidden;
        margin-bottom: 24px;
      }
      .about-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
      }
      .about-img-placeholder {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #dde6ff 0%, #b8caff 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "DM Serif Display", serif;
        font-size: 3rem;
        color: #1a2f6b;
        opacity: 0.6;
      }
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }
      .stat {
        background: white;
        border-radius: 12px;
        padding: 20px 16px;
        text-align: center;
        box-shadow: 0 2px 12px rgba(26, 47, 107, 0.06);
      }
      .stat-number {
        display: block;
        font-family: "DM Serif Display", serif;
        font-size: 1.8rem;
        color: #0f1e47;
      }
      .stat-label {
        font-size: 0.75rem;
        color: #6b7a99;
        font-weight: 500;
      }
      .eyebrow {
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #3b5bdb;
        margin-bottom: 12px;
      }
      h2 {
        font-family: "DM Serif Display", serif;
        font-size: 2.2rem;
        color: #0f1e47;
        margin-bottom: 24px;
        line-height: 1.2;
      }
      p {
        color: #4a5568;
        margin-bottom: 16px;
        line-height: 1.7;
        font-size: 1rem;
      }
      .btn-cta {
        display: inline-flex;
        align-items: center;
        background: #0f1e47;
        color: white;
        padding: 14px 28px;
        border-radius: 8px;
        font-weight: 600;
        text-decoration: none;
        margin-top: 24px;
        transition: all 0.2s;
        &:hover {
          background: #2a4494;
          transform: translateY(-2px);
        }
      }
      @media (max-width: 768px) {
        .about-grid {
          grid-template-columns: 1fr;
          gap: 40px;
        }
        .container {
          padding: 0 20px;
        }
      }
    `,
  ],
})
export class AboutComponent implements OnInit {
  profile: Profile | null = null;
  aboutImageUrl: string | null = null;
  private apiBase = "http://localhost:3000";

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getProfile().subscribe({
      next: (p) => {
        this.profile = p;
        if (p.aboutImage) {
          this.aboutImageUrl = p.aboutImage.startsWith("http")
            ? p.aboutImage
            : `${this.apiBase}${p.aboutImage}`;
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

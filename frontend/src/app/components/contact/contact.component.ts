import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../../services/api.service";
import { Profile } from "../../models";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="contact" id="contact">
      <div class="container">
        <h2 class="section-title">Let's Simplify Your Workflow Together</h2>
        <p class="section-subtitle">
          Ready to reclaim your time and boost productivity? Get in touch today!
        </p>
        <div class="contact-card">
          <div class="contact-info">
            <div class="contact-item">
              <div class="contact-icon">✉</div>
              <div>
                <strong>Email</strong>
                <a
                  [href]="
                    'mailto:' + (profile?.email || 'winfredmwikali@gmail.com')
                  "
                  >{{ profile?.email || "winfredmwikali@gmail.com" }}</a
                >
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">📞</div>
              <div>
                <strong>Phone</strong>
                <a [href]="'tel:' + (profile?.phone || '+254716064342')">{{
                  profile?.phone || "+254 716 064 342"
                }}</a>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">in</div>
              <div>
                <strong>LinkedIn</strong>
                <a [href]="profile?.linkedinUrl || '#'" target="_blank"
                  >Connect with me on LinkedIn</a
                >
              </div>
            </div>
          </div>
          <a
            [href]="'mailto:' + (profile?.email || 'winfredmwikali@gmail.com')"
            class="btn-send"
            >Send Me a Message</a
          >
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .contact {
        background: #f8faff;
        padding: 100px 0;
      }
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 0 40px;
      }
      .section-title {
        font-family: "DM Serif Display", serif;
        font-size: clamp(1.8rem, 4vw, 2.6rem);
        color: #0f1e47;
        text-align: center;
        margin-bottom: 12px;
      }
      .section-subtitle {
        color: #6b7a99;
        text-align: center;
        margin-bottom: 48px;
      }
      .contact-card {
        background: white;
        border-radius: 20px;
        padding: 48px;
        box-shadow: 0 4px 32px rgba(26, 47, 107, 0.08);
      }
      .contact-info {
        display: flex;
        flex-direction: column;
        gap: 0;
      }
      .contact-item {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 20px 0;
        border-bottom: 1px solid #f0f4ff;
        &:last-child {
          border-bottom: none;
        }
        div {
          display: flex;
          flex-direction: column;
          gap: 2px;
          strong {
            font-weight: 600;
            color: #0f1e47;
            font-size: 0.95rem;
          }
          a {
            color: #6b7a99;
            text-decoration: none;
            font-size: 0.9rem;
            &:hover {
              color: #3b5bdb;
            }
          }
        }
      }
      .contact-icon {
        width: 44px;
        height: 44px;
        background: #f0f4ff;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        color: #1a2f6b;
        font-weight: 700;
        flex-shrink: 0;
      }
      .btn-send {
        display: block;
        width: 100%;
        background: #0f1e47;
        color: white;
        padding: 16px;
        border-radius: 10px;
        text-align: center;
        text-decoration: none;
        font-weight: 600;
        margin-top: 28px;
        font-size: 1rem;
        transition: all 0.2s;
        &:hover {
          background: #2a4494;
        }
      }
      @media (max-width: 768px) {
        .container {
          padding: 0 20px;
        }
        .contact-card {
          padding: 28px;
        }
      }
    `,
  ],
})
export class ContactComponent implements OnInit {
  profile: Profile | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api
      .getProfile()
      .subscribe({ next: (p) => (this.profile = p), error: () => {} });
  }
}

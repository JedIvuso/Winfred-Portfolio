import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../../services/api.service";
import { Testimonial } from "../../models";

@Component({
  selector: "app-testimonials",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="testimonials" id="testimonials">
      <div class="container">
        <h2 class="section-title">Client Testimonials</h2>
        <p class="section-subtitle">What clients say about working with me</p>
        <div class="testimonials-grid">
          <div
            class="testimonial-card"
            *ngFor="let t of testimonials.length ? testimonials : fallback"
          >
            <div class="quote-icon">"</div>
            <p class="quote-text">{{ t.quote }}</p>
            <div class="testimonial-author">
              <div class="author-avatar">{{ getInitials(t.name) }}</div>
              <div class="author-info">
                <strong>{{ t.name }}</strong>
                <span>{{ t.title }}</span>
                <span class="company">{{ t.company }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .testimonials {
        background: white;
        padding: 100px 0;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 40px;
      }
      .section-title {
        font-family: "DM Serif Display", serif;
        font-size: clamp(2rem, 4vw, 2.8rem);
        color: #0f1e47;
        text-align: center;
        margin-bottom: 12px;
      }
      .section-subtitle {
        color: #6b7a99;
        text-align: center;
        margin-bottom: 60px;
      }
      .testimonials-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }
      .testimonial-card {
        background: #f8faff;
        border: 1px solid #e8edff;
        border-radius: 16px;
        padding: 32px;
        transition: all 0.3s ease;
        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(26, 47, 107, 0.1);
          border-color: #3b5bdb;
        }
      }
      .quote-icon {
        font-family: "DM Serif Display", serif;
        font-size: 3rem;
        color: #3b5bdb;
        line-height: 1;
        margin-bottom: 16px;
        opacity: 0.5;
      }
      .quote-text {
        color: #4a5568;
        line-height: 1.7;
        font-size: 0.95rem;
        margin-bottom: 24px;
        font-style: italic;
      }
      .testimonial-author {
        display: flex;
        align-items: center;
        gap: 14px;
        padding-top: 20px;
        border-top: 1px solid #e8edff;
      }
      .author-avatar {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: linear-gradient(135deg, #1a2f6b, #3b5bdb);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.8rem;
        flex-shrink: 0;
      }
      .author-info {
        display: flex;
        flex-direction: column;
        strong {
          color: #0f1e47;
          font-weight: 600;
          font-size: 0.9rem;
        }
        span {
          color: #6b7a99;
          font-size: 0.8rem;
        }
        .company {
          font-size: 0.75rem;
        }
      }
      @media (max-width: 900px) {
        .testimonials-grid {
          grid-template-columns: 1fr;
        }
      }
      @media (max-width: 768px) {
        .container {
          padding: 0 20px;
        }
      }
    `,
  ],
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [];
  fallback: any[] = [
    {
      quote:
        "Winfred has been an absolute lifesaver for our team. Her organizational skills and attention to detail have transformed how we manage our daily operations. Highly reliable!",
      name: "Sarah Mitchell",
      title: "Operations Manager",
      company: "Kai Concept",
    },
    {
      quote:
        "Working with Winfred means never having to worry about the small things that make a big difference. She's proactive, professional, and always delivers on time.",
      name: "David Kimani",
      title: "Founder & CEO",
      company: "Kazo Fits",
    },
    {
      quote:
        "Winfred's ability to juggle multiple projects while maintaining quality is impressive. She has become an indispensable part of our workflow and project coordination.",
      name: "Michael Ochieng",
      title: "Project Director",
      company: "Construction Materials Ltd",
    },
  ];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api
      .getTestimonials()
      .subscribe({ next: (t) => (this.testimonials = t), error: () => {} });
  }

  getInitials(name: string): string {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }
}

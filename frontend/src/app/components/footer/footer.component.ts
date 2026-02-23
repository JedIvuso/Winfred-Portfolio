import { Component } from "@angular/core";

@Component({
  selector: "app-footer",
  standalone: true,
  template: `
    <footer>
      <div class="footer-inner">
        <p>© {{ year }} Winfred Mwikali. All rights reserved.</p>
        <p>Professional Business Operations Consultant</p>
      </div>
    </footer>
  `,
  styles: [
    `
      footer {
        background: #0f1e47;
        color: rgba(255, 255, 255, 0.7);
        padding: 32px 40px;
      }
      .footer-inner {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        text-align: center;
        font-size: 0.9rem;
      }
    `,
  ],
})
export class FooterComponent {
  year = new Date().getFullYear();
}

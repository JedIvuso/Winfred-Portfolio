import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo-icon">JM</div>
        <div>
          <div class="logo-name">Winfred Mwikali</div>
          <div class="logo-sub">Admin Panel</div>
        </div>
      </div>
      <nav class="sidebar-nav">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">📊</span>
          <span>Dashboard</span>
        </a>
        <a routerLink="/profile" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">👤</span>
          <span>Profile</span>
        </a>
        <a
          routerLink="/testimonials"
          routerLinkActive="active"
          class="nav-item"
        >
          <span class="nav-icon">💬</span>
          <span>Testimonials</span>
        </a>
        <a routerLink="/services" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">⚙️</span>
          <span>Services</span>
        </a>
        <a routerLink="/tools" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">🔧</span>
          <span>Tools</span>
        </a>
      </nav>
      <div class="sidebar-footer">
        <a
          href="https://winfred-portfolio-virid.vercel.app"
          target="_blank"
          class="view-site"
        >
          <span>View Website</span>
          <span>↗</span>
        </a>
      </div>
    </aside>
  `,
  styles: [
    `
      .sidebar {
        width: 240px;
        background: #0f1e47;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        padding: 0;
        z-index: 100;
      }
      .sidebar-header {
        padding: 24px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      .logo-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #3b5bdb, #6c8ef7);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        color: white;
        font-size: 0.85rem;
        flex-shrink: 0;
      }
      .logo-name {
        color: white;
        font-weight: 700;
        font-size: 0.95rem;
      }
      .logo-sub {
        color: rgba(255, 255, 255, 0.45);
        font-size: 0.75rem;
      }
      .sidebar-nav {
        flex: 1;
        padding: 16px 12px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .nav-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 14px;
        border-radius: 10px;
        color: rgba(255, 255, 255, 0.65);
        text-decoration: none;
        font-weight: 500;
        font-size: 0.9rem;
        transition: all 0.2s;
        .nav-icon {
          font-size: 1rem;
        }
        &:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }
        &.active {
          background: rgba(255, 255, 255, 0.15);
          color: white;
        }
      }
      .sidebar-footer {
        padding: 16px 12px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }
      .view-site {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        border-radius: 8px;
        background: rgba(59, 91, 219, 0.3);
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        font-size: 0.85rem;
        font-weight: 500;
        &:hover {
          background: rgba(59, 91, 219, 0.5);
          color: white;
        }
      }
    `,
  ],
})
export class SidebarComponent {}

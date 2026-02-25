import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, RouterLink, RouterLinkActive } from "@angular/router";
import { AdminApiService, Profile } from "../../services/admin-api.service";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  template: `
    <!-- Mobile top bar -->
    <div class="mobile-topbar">
      <div class="mobile-logo">
        <div class="logo-icon">{{ getInitials() }}</div>
        <span class="logo-name">{{ profile?.name || "Winfred Mwikali" }}</span>
      </div>
      <button
        class="hamburger"
        (click)="toggleSidebar()"
        [class.active]="isOpen"
      >
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Overlay -->
    <div
      class="overlay"
      [class.visible]="isOpen"
      (click)="closeSidebar()"
    ></div>

    <!-- Sidebar -->
    <aside class="sidebar" [class.open]="isOpen">
      <div class="sidebar-header">
        <div class="logo-icon">{{ getInitials() }}</div>
        <div>
          <div class="logo-name">{{ profile?.name || "Winfred Mwikali" }}</div>
          <div class="logo-sub">Admin Panel</div>
        </div>
        <button class="close-btn" (click)="closeSidebar()">✕</button>
      </div>
      <nav class="sidebar-nav">
        <a
          routerLink="/dashboard"
          routerLinkActive="active"
          class="nav-item"
          (click)="closeSidebar()"
        >
          <span class="nav-icon">📊</span>
          <span>Dashboard</span>
        </a>
        <a
          routerLink="/profile"
          routerLinkActive="active"
          class="nav-item"
          (click)="closeSidebar()"
        >
          <span class="nav-icon">👤</span>
          <span>Profile</span>
        </a>
        <a
          routerLink="/testimonials"
          routerLinkActive="active"
          class="nav-item"
          (click)="closeSidebar()"
        >
          <span class="nav-icon">💬</span>
          <span>Testimonials</span>
        </a>
        <a
          routerLink="/services"
          routerLinkActive="active"
          class="nav-item"
          (click)="closeSidebar()"
        >
          <span class="nav-icon">⚙️</span>
          <span>Services</span>
        </a>
        <a
          routerLink="/tools"
          routerLinkActive="active"
          class="nav-item"
          (click)="closeSidebar()"
        >
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
      /* Mobile top bar */
      .mobile-topbar {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 200;
        background: #0f1e47;
        padding: 12px 16px;
        align-items: center;
        justify-content: space-between;
      }
      .mobile-logo {
        display: flex;
        align-items: center;
        gap: 10px;
        .logo-name {
          color: white;
          font-weight: 700;
          font-size: 0.95rem;
        }
      }

      /* Hamburger */
      .hamburger {
        display: flex;
        flex-direction: column;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        span {
          display: block;
          width: 24px;
          height: 2px;
          background: white;
          border-radius: 2px;
          transition: all 0.3s;
        }
        &.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        &.active span:nth-child(2) {
          opacity: 0;
        }
        &.active span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
      }

      /* Overlay */
      .overlay {
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        z-index: 149;
        opacity: 0;
        transition: opacity 0.3s;
        &.visible {
          opacity: 1;
        }
      }

      /* Sidebar */
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
        z-index: 150;
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
      .close-btn {
        display: none;
        margin-left: auto;
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.6);
        font-size: 1.1rem;
        cursor: pointer;
        padding: 4px 6px;
        border-radius: 6px;
        &:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }
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

      /* Mobile */
      @media (max-width: 768px) {
        .mobile-topbar {
          display: flex;
        }
        .overlay {
          display: block;
          pointer-events: none;
          &.visible {
            pointer-events: all;
          }
        }
        .sidebar {
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          &.open {
            transform: translateX(0);
          }
        }
        .close-btn {
          display: block;
        }
      }
    `,
  ],
})
export class SidebarComponent implements OnInit {
  isOpen = false;
  profile: Profile | null = null;

  constructor(private api: AdminApiService) {}

  ngOnInit() {
    this.api.getProfile().subscribe({
      next: (p) => (this.profile = p),
      error: () => {},
    });
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
  closeSidebar() {
    this.isOpen = false;
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

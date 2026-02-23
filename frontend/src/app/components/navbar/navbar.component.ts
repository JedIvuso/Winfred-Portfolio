import { Component, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav [class.scrolled]="scrolled">
      <div class="nav-inner">
        <a class="logo" href="#">Winfred Mwikali</a>
        <div class="nav-links" [class.open]="menuOpen">
          <a href="#about" (click)="closeMenu()">About</a>
          <a href="#services" (click)="closeMenu()">Services</a>
          <a href="#tools" (click)="closeMenu()">Tools</a>
          <a href="#testimonials" (click)="closeMenu()">Testimonials</a>
          <a href="#contact" (click)="closeMenu()">Contact</a>
          <a href="#contact" class="btn-nav" (click)="closeMenu()"
            >Get in Touch</a
          >
        </div>
        <button
          class="hamburger"
          (click)="toggleMenu()"
          [class.active]="menuOpen"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  `,
  styles: [
    `
      nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        padding: 20px 40px;
        transition: all 0.3s ease;
        background: transparent;
      }
      nav.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(12px);
        padding: 14px 40px;
        box-shadow: 0 2px 20px rgba(26, 47, 107, 0.08);
      }
      .nav-inner {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .logo {
        font-family: "DM Serif Display", serif;
        font-size: 1.3rem;
        color: #1a2f6b;
        text-decoration: none;
        font-weight: 400;
      }
      .nav-links {
        display: flex;
        align-items: center;
        gap: 32px;
        a {
          color: #1a2f6b;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          transition: color 0.2s;
          &:hover {
            color: #3b5bdb;
          }
        }
        .btn-nav {
          background: #0f1e47;
          color: white !important;
          padding: 10px 22px;
          border-radius: 8px;
          font-weight: 600;
          &:hover {
            background: #2a4494;
          }
        }
      }
      .hamburger {
        display: none;
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
          background: #1a2f6b;
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
      @media (max-width: 768px) {
        nav {
          padding: 16px 20px;
        }
        nav.scrolled {
          padding: 12px 20px;
        }
        .hamburger {
          display: flex;
        }
        .nav-links {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 40px;
          z-index: -1;
          &.open {
            display: flex;
          }
          a {
            font-size: 1.2rem;
          }
        }
      }
    `,
  ],
})
export class NavbarComponent {
  scrolled = false;
  menuOpen = false;

  @HostListener("window:scroll")
  onScroll() {
    this.scrolled = window.scrollY > 20;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  closeMenu() {
    this.menuOpen = false;
  }
}

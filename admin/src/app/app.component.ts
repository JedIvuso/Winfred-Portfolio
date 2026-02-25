import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  template: `
    <div class="admin-layout">
      <app-sidebar></app-sidebar>
      <main class="admin-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .admin-layout {
        display: flex;
        min-height: 100vh;
      }
      .admin-main {
        margin-left: 240px;
        flex: 1;
        padding: 32px;
        background: #f5f7ff;
        min-height: 100vh;
      }
      @media (max-width: 768px) {
        .admin-main {
          margin-left: 0;
          padding: 16px;
          padding-top: 72px;
        }
      }
    `,
  ],
})
export class AppComponent {}

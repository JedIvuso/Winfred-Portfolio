import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TestimonialsPageComponent } from './pages/testimonials/testimonials-page.component';
import { ServicesPageComponent } from './pages/services/services-page.component';
import { ToolsPageComponent } from './pages/tools/tools-page.component';
import { ProfilePageComponent } from './pages/profile/profile-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'testimonials', component: TestimonialsPageComponent },
  { path: 'services', component: ServicesPageComponent },
  { path: 'tools', component: ToolsPageComponent },
  { path: 'profile', component: ProfilePageComponent },
];

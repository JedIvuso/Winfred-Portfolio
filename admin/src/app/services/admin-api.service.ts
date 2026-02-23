import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Testimonial {
  id: number; quote: string; name: string; title: string;
  company: string; isVisible: boolean; order: number; createdAt: Date;
}
export interface Service {
  id: number; title: string; description: string; icon: string; isVisible: boolean; order: number;
}
export interface Profile {
  id: number; name: string; tagline: string; title: string;
  aboutParagraph1: string; aboutParagraph2: string; aboutParagraph3: string;
  email: string; phone: string; linkedinUrl: string;
  heroImage?: string | null;
  aboutImage?: string | null;
}
export interface Tool {
  id: number; name: string; category: string; isVisible: boolean; order: number;
}

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private base = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  // Profile
  getProfile(): Observable<Profile> { return this.http.get<Profile>(`${this.base}/profile`); }
  updateProfile(data: Partial<Profile>): Observable<Profile> { return this.http.put<Profile>(`${this.base}/profile`, data); }

  // Testimonials
  getTestimonials(): Observable<Testimonial[]> { return this.http.get<Testimonial[]>(`${this.base}/testimonials/admin`); }
  createTestimonial(data: Partial<Testimonial>): Observable<Testimonial> { return this.http.post<Testimonial>(`${this.base}/testimonials`, data); }
  updateTestimonial(id: number, data: Partial<Testimonial>): Observable<Testimonial> { return this.http.put<Testimonial>(`${this.base}/testimonials/${id}`, data); }
  deleteTestimonial(id: number): Observable<any> { return this.http.delete(`${this.base}/testimonials/${id}`); }

  // Services
  getServices(): Observable<Service[]> { return this.http.get<Service[]>(`${this.base}/services/admin`); }
  createService(data: Partial<Service>): Observable<Service> { return this.http.post<Service>(`${this.base}/services`, data); }
  updateService(id: number, data: Partial<Service>): Observable<Service> { return this.http.put<Service>(`${this.base}/services/${id}`, data); }
  deleteService(id: number): Observable<any> { return this.http.delete(`${this.base}/services/${id}`); }

  // Tools
  getTools(): Observable<Tool[]> { return this.http.get<Tool[]>(`${this.base}/tools/admin`); }
  createTool(data: Partial<Tool>): Observable<Tool> { return this.http.post<Tool>(`${this.base}/tools`, data); }
  updateTool(id: number, data: Partial<Tool>): Observable<Tool> { return this.http.put<Tool>(`${this.base}/tools/${id}`, data); }
  deleteTool(id: number): Observable<any> { return this.http.delete(`${this.base}/tools/${id}`); }
}

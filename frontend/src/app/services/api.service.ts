import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Testimonial, Service, Profile, Tool } from '../models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> { return this.http.get<Profile>(`${this.base}/profile`); }
  getTestimonials(): Observable<Testimonial[]> { return this.http.get<Testimonial[]>(`${this.base}/testimonials`); }
  getServices(): Observable<Service[]> { return this.http.get<Service[]>(`${this.base}/services`); }
  getTools(): Observable<Tool[]> { return this.http.get<Tool[]>(`${this.base}/tools`); }
}

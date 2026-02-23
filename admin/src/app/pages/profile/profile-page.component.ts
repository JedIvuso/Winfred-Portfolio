import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdminApiService, Profile } from '../../services/admin-api.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <div class="page-header">
        <h1>Edit Profile</h1>
        <p>Update your photos, text, and contact details</p>
      </div>

      <div class="loading" *ngIf="loading">Loading profile...</div>
      <div class="error-banner" *ngIf="error">
        ⚠️ Could not connect to backend. Make sure NestJS server is running on port 3000.
      </div>

      <div class="profile-form" *ngIf="!loading && profile">

        <!-- PHOTOS SECTION -->
        <div class="section-card">
          <h2>📸 Photos</h2>
          <p class="section-desc">Upload your photos for the hero and about sections of the website.</p>

          <div class="photos-grid">

            <!-- Hero Photo -->
            <div class="photo-upload-block">
              <div class="photo-label">
                <strong>Hero Photo</strong>
                <span>Large photo on the homepage (portrait, min 600×700px recommended)</span>
              </div>
              <div
                class="drop-zone"
                [class.has-image]="heroPreview || profile.heroImage"
                [class.dragging]="draggingHero"
                (click)="triggerInput('hero')"
                (dragover)="onDragOver($event, 'hero')"
                (dragleave)="onDragLeave('hero')"
                (drop)="onDrop($event, 'hero')"
              >
                <img
                  *ngIf="heroPreview || profile.heroImage"
                  [src]="heroPreview || getImageUrl(profile.heroImage!)"
                  alt="Hero preview"
                  class="preview-img"
                />
                <div class="drop-zone-content" *ngIf="!heroPreview && !profile.heroImage">
                  <span class="upload-icon">🖼️</span>
                  <p>Click or drag & drop your photo</p>
                  <span class="file-hint">JPG, PNG, WEBP — max 5MB</span>
                </div>
                <div class="image-overlay" *ngIf="heroPreview || profile.heroImage">
                  <span>🖊 Click to change</span>
                </div>
              </div>
              <div class="upload-actions">
                <button class="btn btn-primary" (click)="uploadImage('hero')" [disabled]="!heroFile || uploading.hero">
                  {{ uploading.hero ? 'Uploading...' : 'Upload Hero Photo' }}
                </button>
                <button class="btn btn-danger" *ngIf="profile.heroImage" (click)="removeImage('heroImage')">Remove</button>
              </div>
              <div class="upload-success" *ngIf="uploadSuccess.hero">✓ Hero photo updated successfully!</div>
              <input id="heroFileInput" type="file" accept="image/*" (change)="onFileSelected($event, 'hero')" style="display:none" />
            </div>

            <!-- About Photo -->
            <div class="photo-upload-block">
              <div class="photo-label">
                <strong>About Section Photo</strong>
                <span>Photo shown in "About Me" (portrait or square, min 500×500px recommended)</span>
              </div>
              <div
                class="drop-zone"
                [class.has-image]="aboutPreview || profile.aboutImage"
                [class.dragging]="draggingAbout"
                (click)="triggerInput('about')"
                (dragover)="onDragOver($event, 'about')"
                (dragleave)="onDragLeave('about')"
                (drop)="onDrop($event, 'about')"
              >
                <img
                  *ngIf="aboutPreview || profile.aboutImage"
                  [src]="aboutPreview || getImageUrl(profile.aboutImage!)"
                  alt="About preview"
                  class="preview-img"
                />
                <div class="drop-zone-content" *ngIf="!aboutPreview && !profile.aboutImage">
                  <span class="upload-icon">🖼️</span>
                  <p>Click or drag & drop your photo</p>
                  <span class="file-hint">JPG, PNG, WEBP — max 5MB</span>
                </div>
                <div class="image-overlay" *ngIf="aboutPreview || profile.aboutImage">
                  <span>🖊 Click to change</span>
                </div>
              </div>
              <div class="upload-actions">
                <button class="btn btn-primary" (click)="uploadImage('about')" [disabled]="!aboutFile || uploading.about">
                  {{ uploading.about ? 'Uploading...' : 'Upload About Photo' }}
                </button>
                <button class="btn btn-danger" *ngIf="profile.aboutImage" (click)="removeImage('aboutImage')">Remove</button>
              </div>
              <div class="upload-success" *ngIf="uploadSuccess.about">✓ About photo updated successfully!</div>
              <input id="aboutFileInput" type="file" accept="image/*" (change)="onFileSelected($event, 'about')" style="display:none" />
            </div>

          </div>
        </div>

        <!-- HERO TEXT -->
        <div class="section-card">
          <h2>🏠 Hero Section Text</h2>
          <div class="form-group">
            <label>Your Name</label>
            <input type="text" [(ngModel)]="profile.name">
          </div>
          <div class="form-group">
            <label>Main Tagline <span class="hint">(the large heading visitors see first)</span></label>
            <input type="text" [(ngModel)]="profile.tagline" placeholder="e.g. Helping you stay organized, productive, and stress-free">
          </div>
          <div class="form-group">
            <label>Professional Title</label>
            <input type="text" [(ngModel)]="profile.title" placeholder="e.g. Professional Business Operations Consultant">
          </div>
        </div>

        <!-- ABOUT TEXT -->
        <div class="section-card">
          <h2>👤 About Me Text</h2>
          <div class="form-group">
            <label>Paragraph 1 <span class="hint">(introduction)</span></label>
            <textarea [(ngModel)]="profile.aboutParagraph1" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>Paragraph 2 <span class="hint">(your mission)</span></label>
            <textarea [(ngModel)]="profile.aboutParagraph2" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>Paragraph 3 <span class="hint">(your approach)</span></label>
            <textarea [(ngModel)]="profile.aboutParagraph3" rows="3"></textarea>
          </div>
        </div>

        <!-- CONTACT -->
        <div class="section-card">
          <h2>📬 Contact Information</h2>
          <div class="form-row">
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" [(ngModel)]="profile.email">
            </div>
            <div class="form-group">
              <label>Phone Number</label>
              <input type="tel" [(ngModel)]="profile.phone">
            </div>
          </div>
          <div class="form-group">
            <label>LinkedIn URL</label>
            <input type="url" [(ngModel)]="profile.linkedinUrl" placeholder="https://linkedin.com/in/yourprofile">
          </div>
        </div>

        <!-- SAVE -->
        <div class="form-actions">
          <div class="save-status" *ngIf="saveStatus">
            <span [class.success]="saveStatus === 'saved'" [class.error]="saveStatus === 'error'">
              {{ saveStatus === 'saved' ? '✓ Profile saved successfully!' : '✗ Error saving. Please try again.' }}
            </span>
          </div>
          <button class="btn btn-primary btn-lg" (click)="save()" [disabled]="saving">
            {{ saving ? 'Saving...' : 'Save All Changes' }}
          </button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .page { max-width: 900px; }
    .page-header { margin-bottom: 32px; }
    h1 { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #0f1e47; margin-bottom: 4px; }
    .page-header > p { color: #6b7a99; }

    .profile-form { display: flex; flex-direction: column; gap: 24px; }

    .section-card {
      background: white;
      border-radius: 14px;
      padding: 28px;
      box-shadow: 0 2px 12px rgba(26,47,107,0.06);
    }
    .section-card h2 {
      font-family: 'DM Serif Display', serif;
      font-size: 1.2rem;
      color: #0f1e47;
      padding-bottom: 14px;
      border-bottom: 1px solid #e8edff;
      margin-bottom: 6px;
    }
    .section-desc { color: #6b7a99; font-size: 0.875rem; margin-bottom: 24px; }

    /* Photos */
    .photos-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 8px; }
    .photo-upload-block { display: flex; flex-direction: column; gap: 12px; }
    .photo-label strong { display: block; color: #0f1e47; font-size: 0.9rem; margin-bottom: 4px; }
    .photo-label span { color: #6b7a99; font-size: 0.775rem; line-height: 1.5; }

    .drop-zone {
      position: relative;
      border: 2px dashed #c5d3ff;
      border-radius: 12px;
      height: 230px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      overflow: hidden;
      background: #f8faff;
      transition: all 0.2s ease;
    }
    .drop-zone:hover { border-color: #3b5bdb; background: #f0f4ff; }
    .drop-zone.dragging { border-color: #3b5bdb; background: #eef2ff; transform: scale(1.01); box-shadow: 0 0 0 4px rgba(59,91,219,0.1); }
    .drop-zone.has-image { border-style: solid; border-color: #c5d3ff; }

    .drop-zone-content { text-align: center; pointer-events: none; padding: 20px; }
    .upload-icon { font-size: 2.4rem; display: block; margin-bottom: 10px; }
    .drop-zone-content p { color: #4a5568; font-size: 0.875rem; font-weight: 500; margin-bottom: 6px; }
    .file-hint { font-size: 0.75rem; color: #6b7a99; }

    .preview-img { width: 100%; height: 100%; object-fit: cover; object-position: top; }

    .image-overlay {
      position: absolute;
      inset: 0;
      background: rgba(15,30,71,0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s;
    }
    .image-overlay span { color: white; font-weight: 600; font-size: 0.875rem; }
    .drop-zone:hover .image-overlay { opacity: 1; }

    .upload-actions { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
    .upload-success { color: #38a169; font-weight: 600; font-size: 0.85rem; }

    /* Form */
    .form-group { margin-bottom: 20px; }
    label { display: block; font-weight: 600; font-size: 0.875rem; color: #0f1e47; margin-bottom: 6px; }
    .hint { font-weight: 400; color: #6b7a99; font-size: 0.8rem; }
    input, textarea {
      width: 100%; padding: 10px 14px; border: 2px solid #e8edff; border-radius: 8px;
      font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: #1a2f6b;
      transition: border-color 0.2s;
    }
    input:focus, textarea:focus { outline: none; border-color: #3b5bdb; }
    textarea { resize: vertical; min-height: 90px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

    .form-actions { display: flex; align-items: center; justify-content: flex-end; gap: 16px; padding-bottom: 40px; }
    .btn-lg { padding: 14px 32px; font-size: 1rem; }
    .save-status .success { color: #38a169; font-weight: 600; font-size: 0.9rem; }
    .save-status .error { color: #e53e3e; font-weight: 600; font-size: 0.9rem; }

    .loading { text-align: center; padding: 60px; color: #6b7a99; }
    .error-banner { background: #fff0f0; border: 1px solid #ffcdd2; border-radius: 10px; padding: 16px 20px; color: #e53e3e; margin-bottom: 24px; font-size: 0.9rem; }

    /* Buttons */
    .btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 0.875rem; border: none; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-primary { background: #0f1e47; color: white; }
    .btn-primary:not(:disabled):hover { background: #2a4494; }
    .btn-danger { background: #fff0f0; color: #e53e3e; border: 1px solid #ffcdd2; }
    .btn-danger:hover { background: #ffcdd2; }

    @media (max-width: 700px) {
      .photos-grid, .form-row { grid-template-columns: 1fr; }
    }
  `]
})
export class ProfilePageComponent implements OnInit {
  profile: Profile | null = null;
  loading = true;
  error = false;
  saving = false;
  saveStatus: string | null = null;

  heroFile: File | null = null;
  aboutFile: File | null = null;
  heroPreview: string | null = null;
  aboutPreview: string | null = null;
  draggingHero = false;
  draggingAbout = false;
  uploading = { hero: false, about: false };
  uploadSuccess = { hero: false, about: false };

  private apiBase = 'http://localhost:3000/api';

  constructor(private api: AdminApiService, private http: HttpClient) {}

  ngOnInit() {
    this.api.getProfile().subscribe({
      next: p => { this.profile = { ...p }; this.loading = false; },
      error: () => { this.loading = false; this.error = true; }
    });
  }

  getImageUrl(path: string): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `http://localhost:3000${path}`;
  }

  triggerInput(field: 'hero' | 'about') {
    const id = field === 'hero' ? 'heroFileInput' : 'aboutFileInput';
    document.getElementById(id)?.click();
  }

  onFileSelected(event: Event, field: 'hero' | 'about') {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) this.setFile(input.files[0], field);
  }

  onDragOver(event: DragEvent, field: 'hero' | 'about') {
    event.preventDefault();
    if (field === 'hero') this.draggingHero = true;
    else this.draggingAbout = true;
  }

  onDragLeave(field: 'hero' | 'about') {
    if (field === 'hero') this.draggingHero = false;
    else this.draggingAbout = false;
  }

  onDrop(event: DragEvent, field: 'hero' | 'about') {
    event.preventDefault();
    if (field === 'hero') this.draggingHero = false;
    else this.draggingAbout = false;
    const file = event.dataTransfer?.files[0];
    if (file && file.type.startsWith('image/')) this.setFile(file, field);
  }

  setFile(file: File, field: 'hero' | 'about') {
    if (file.size > 5 * 1024 * 1024) { alert('File is too large. Maximum size is 5MB.'); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (field === 'hero') { this.heroFile = file; this.heroPreview = e.target?.result as string; }
      else { this.aboutFile = file; this.aboutPreview = e.target?.result as string; }
    };
    reader.readAsDataURL(file);
  }

  uploadImage(field: 'hero' | 'about') {
    const file = field === 'hero' ? this.heroFile : this.aboutFile;
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    this.uploading[field] = true;
    this.uploadSuccess[field] = false;
    const endpoint = field === 'hero' ? 'heroImage' : 'aboutImage';
    this.http.post<{ url: string }>(`${this.apiBase}/profile/upload/${endpoint}`, formData).subscribe({
      next: (res) => {
        this.uploading[field] = false;
        this.uploadSuccess[field] = true;
        if (this.profile) {
          if (field === 'hero') this.profile.heroImage = res.url;
          else this.profile.aboutImage = res.url;
        }
        setTimeout(() => this.uploadSuccess[field] = false, 3000);
      },
      error: () => {
        this.uploading[field] = false;
        alert(`Upload failed. Make sure the backend is running on port 3000.`);
      }
    });
  }

  removeImage(imageField: 'heroImage' | 'aboutImage') {
    if (!this.profile || !confirm('Remove this photo?')) return;
    (this.profile as any)[imageField] = null;
    if (imageField === 'heroImage') { this.heroPreview = null; this.heroFile = null; }
    else { this.aboutPreview = null; this.aboutFile = null; }
    this.api.updateProfile({ [imageField]: null }).subscribe();
  }

  save() {
    if (!this.profile) return;
    this.saving = true;
    this.saveStatus = null;
    this.api.updateProfile(this.profile).subscribe({
      next: () => { this.saving = false; this.saveStatus = 'saved'; setTimeout(() => this.saveStatus = null, 3000); },
      error: () => { this.saving = false; this.saveStatus = 'error'; }
    });
  }
}

# Joy Moraa — Portfolio Website

A full-stack portfolio website with:
- **NestJS Backend** — REST API with SQLite database (auto-seeded with default data)
- **Angular Frontend** (port 4200) — The public-facing portfolio website
- **Angular Admin Panel** (port 4201) — CMS to manage all content without touching code

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ 
- npm v9+

---

### 1. Backend (NestJS)

```bash
cd backend
npm install
npm run start:dev
```

API will run at **http://localhost:3000/api**

The database (`joy-moraa.db`) is auto-created with default data on first run.

---

### 2. Frontend (Public Website)

```bash
cd frontend
npm install
npm start
```

Website will be at **http://localhost:4200**

---

### 3. Admin Panel

```bash
cd admin
npm install
npm start
```

Admin panel will be at **http://localhost:4201**

---

## 📁 Project Structure

```
joy-moraa/
├── backend/                  # NestJS API
│   ├── src/
│   │   ├── testimonials/     # Testimonials CRUD
│   │   ├── services/         # Services CRUD
│   │   ├── tools/            # Tools CRUD
│   │   ├── profile/          # Profile management
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
│
├── frontend/                 # Public Portfolio Website (Angular)
│   ├── src/app/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   ├── hero/
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── tools/
│   │   │   ├── testimonials/
│   │   │   └── contact/
│   │   ├── services/         # API service
│   │   └── models/           # TypeScript interfaces
│   └── package.json
│
└── admin/                    # Admin CMS (Angular)
    ├── src/app/
    │   ├── pages/
    │   │   ├── dashboard/    # Stats overview
    │   │   ├── testimonials/ # Add/Edit/Delete testimonials
    │   │   ├── services/     # Manage services
    │   │   ├── tools/        # Manage tools
    │   │   └── profile/      # Edit bio, contact info
    │   ├── components/
    │   │   └── sidebar/
    │   └── services/         # Admin API service
    └── package.json
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/profile | Get profile data |
| PUT | /api/profile | Update profile |
| GET | /api/testimonials | Get visible testimonials |
| GET | /api/testimonials/admin | Get all testimonials |
| POST | /api/testimonials | Create testimonial |
| PUT | /api/testimonials/:id | Update testimonial |
| DELETE | /api/testimonials/:id | Delete testimonial |
| GET | /api/services | Get visible services |
| GET | /api/services/admin | Get all services |
| POST | /api/services | Create service |
| PUT | /api/services/:id | Update service |
| DELETE | /api/services/:id | Delete service |
| GET | /api/tools | Get visible tools |
| GET | /api/tools/admin | Get all tools |
| POST | /api/tools | Create tool |
| PUT | /api/tools/:id | Update tool |
| DELETE | /api/tools/:id | Delete tool |

---

## 🖼️ Adding Your Photo

In `frontend/src/app/components/hero/hero.component.ts`, replace the `.image-placeholder` div with:

```html
<img src="assets/joy-moraa.jpg" alt="Joy Moraa" />
```

Add your photo to `frontend/src/assets/joy-moraa.jpg`.

Similarly update the about section in `about.component.ts`.

---

## 🔐 Securing the Admin Panel (Recommended)

The admin panel currently has no authentication. To add basic protection:

1. In NestJS, add a guard that checks for an `Authorization` header
2. Or deploy the admin panel on a separate private URL/VPN
3. Or add a simple password check at the Angular level

---

## 🗃️ Database

Uses **SQLite** for simplicity — no database setup required! The file `joy-moraa.db` is created automatically in the backend folder.

To switch to PostgreSQL/MySQL, update `backend/src/app.module.ts`:

```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your_user',
  password: 'your_password',
  database: 'joy_moraa',
  entities: [...],
  synchronize: true,
})
```

---

## 🌐 Deployment

### Backend: Deploy to Railway, Render, or any Node.js host
```bash
npm run build
npm run start:prod
```

### Frontend & Admin: Deploy to Vercel, Netlify, or Firebase Hosting
```bash
npm run build
# Upload the dist/ folder
```

Update `base` URL in both Angular `api.service.ts` and admin `admin-api.service.ts` to point to your production backend URL.

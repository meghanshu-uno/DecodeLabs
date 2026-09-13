# Project 4: Full Stack Integration & Deployment

This project integrates the NEXORA frontend (Project 1) with the Express backend (Project 2 & 3) using REST APIs, SQLite (via Prisma), and Docker for deployment.

## Architecture

- **Client**: Vanilla HTML5, CSS3, and ES6+ JS. No frameworks used.
- **Server**: Node.js, Express, Prisma ORM, SQLite.
- **API**: RESTful endpoints with `/health`, `/tracks`, `/consultations`, `/bookmarks`, and `/checklist`.

## Prerequisites

- Node.js (v18+)
- Docker and Docker Compose (optional for containerized deployment)

## Setup & Running Locally

1. **Backend Initialization**
   ```bash
   cd server
   npm install
   npx prisma generate
   npx prisma db push
   node prisma/seed.js
   npm start
   ```

2. **Frontend Initialization**
   - The frontend is purely static. Serve the `client` folder using any static file server (e.g., Live Server, `serve` module, or Python's `http.server`).
   - The client uses `fetch()` pointing to `http://localhost:3000` by default.

## Docker Deployment

To run both the backend API and frontend statically through Nginx:

```bash
docker-compose up -d --build
```

- Frontend runs on `http://localhost:8080`
- Backend API runs on `http://localhost:3000`

## Live Testing

1. View the frontend at `http://localhost:8080`
2. Browse tracks, which are now fetched dynamically from the database.
3. Save bookmarks and view them in your tray (persisted to SQLite).
4. Fill out the consultation form to see a successful `POST /api/v1/consultations`.
5. Check `http://localhost:3000/health` for backend status.

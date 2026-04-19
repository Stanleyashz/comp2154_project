# Job Application Tracker

Job Application Tracker (JAT) is a COMP 2154 system development project for tracking job applications, interview progress, and related notes.

## Current Status

This repository has been pushed forward to a late-semester COMP 2154 state for Winter 2026:

- Backend API structure for authentication and application tracking
- Frontend React/Vite structure with login, register, and dashboard pages
- Testing and QA planning documents
- Progress report working drafts for Progress Report 2, Progress Report 3, Progress Report 4, and the final report
- Deployment documentation plus Docker packaging for single-service deployment
- Planning and architecture documentation for final submission and demo prep

## Project Structure

```text
job-application-tracker/
  backend/
  frontend/
  docs/
```

## Local Development

After installing dependencies:

```bash
cd backend
npm install
npm run dev
```

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

## Notes

- The current backend uses a lightweight JSON data store so the project can move immediately.
- The course paperwork assumes a later migration to PostgreSQL, which is documented in `docs/architecture/system-design.md`.
- In production, the backend can serve the built frontend from `frontend/dist`, so the app can be deployed as a single Node service.
- For hosted deployments, set `DB_PATH` to a persistent location. The included `render.yaml` uses `/app/data/database.json` on a mounted disk so accounts survive restarts and deploys.

## Deployment

Quickest path:

```bash
docker build -t job-application-tracker .
docker run -p 5000:5000 -e JWT_SECRET=change-me job-application-tracker
```

Then open `http://localhost:5000`.

Detailed deployment notes are in `docs/deployment/deployment-guide.md`.

# Deployment Guide

## Recommended Deployment Path

For this late-stage COMP 2154 submission, the fastest reliable path is a single-service deployment:

- Build the React frontend
- Serve the built frontend from the Express backend
- Deploy the combined service with Docker

This avoids cross-origin issues and reduces setup complexity for grading/demo.

## Environment Variables

Backend:

- `PORT` - server port, default `5000`
- `JWT_SECRET` - required in production
- `FRONTEND_URL` - allowed browser origins for cross-origin access; supports comma-separated values
- `DB_PATH` - absolute path to the JSON database file; in hosted environments this should point to persistent storage

Frontend:

- `VITE_API_URL` - optional; leave blank when frontend is served by the backend in production

## Local Production-Like Run

### Option 1: Docker

```bash
docker build -t job-application-tracker .
docker run -p 5000:5000 -e JWT_SECRET=replace-me job-application-tracker
```

Open `http://localhost:5000`.

### Option 2: Manual Build

```bash
cd frontend
npm install
npm run build

cd ../backend
npm install
npm start
```

Open `http://localhost:5000`.

## Render Deployment

The repository includes `render.yaml` and a root `Dockerfile`.

Steps:

1. Push the repository to GitHub.
2. In Render, create a new Web Service from the repo.
3. Choose the Docker runtime or let Render use `render.yaml`.
4. Set `JWT_SECRET`.
5. Deploy.

If the frontend is being served by the same backend service, `VITE_API_URL` does not need to be set.

Important:

- Render web services use an ephemeral filesystem by default, so accounts written inside the container are lost on restart or redeploy.
- The included `render.yaml` attaches a persistent disk at `/app/data` and sets `DB_PATH=/app/data/database.json`.
- If you deploy manually instead of using the blueprint, add a persistent disk yourself and point `DB_PATH` at that mount path.

## Configuration Management

- Secrets are stored in environment variables, not committed into the repo.
- Frontend API base URL is configurable through `VITE_API_URL`.
- CORS allow-list is configurable through `FRONTEND_URL`.

## Backup and Recovery

Current persistence is file-based JSON storage. In local development it defaults to `backend/src/data/database.json`. In hosted environments it should be moved to a persistent path via `DB_PATH`, such as `/app/data/database.json` on Render.

Backup plan:

1. Stop writes or pause the service.
2. Copy the JSON database file to a dated backup.
3. Store backups outside the container/server.

Recovery plan:

1. Restore the latest valid copy of `database.json`.
2. Restart the service.
3. Verify `/health`, login, and application retrieval.

## Maintenance and Monitoring

- Use the `/health` endpoint for availability checks.
- Review container/service logs for API errors.
- Rotate `JWT_SECRET` when moving to a real production environment.
- For multi-user production usage, move persistence to PostgreSQL instead of relying on a JSON file plus disk.

# Progress Report 4 - Job Application Tracker
**Student:** Stanley Okafor (101529064)  
**Course:** COMP 2154 - System Development Project  
**Focus:** Deployment, evaluation, and final readiness  
**Overall Status:** GREEN

## Executive Summary

This phase focused on moving the Job Application Tracker from a tested development build into a deployable final submission state. The backend was prepared to serve the production frontend build, configuration values were externalized through environment variables, Docker packaging was added for repeatable deployment, and final evaluation documents were prepared. The system now supports the complete target workflow: register, login, create applications, update status, filter/search records, and review summary metrics.

## Deployment Strategy

The selected deployment strategy is a single-service deployment:

- React frontend is built into static assets
- Express backend serves the built frontend
- Docker packages the full application into one deployable image

This approach reduces environment drift, simplifies grading, and avoids separate frontend/backend synchronization issues.

## Major Milestones and Completed Work

| Milestone | Status | Notes |
|-----------|--------|-------|
| Frontend-backend integration | Complete | Shared production entry point |
| Production frontend serving | Complete | Express serves `frontend/dist` |
| Environment-based config | Complete | `FRONTEND_URL`, `JWT_SECRET`, `VITE_API_URL` |
| Docker deployment packaging | Complete | Root `Dockerfile` and `.dockerignore` added |
| Render deployment prep | Complete | `render.yaml` added |
| Deployment documentation | Complete | Step-by-step guide written |
| Final report drafting | In progress | Technical report draft prepared in repo |

## Deployment Overview

Deployment can now be performed in either of two ways:

- Docker deployment for the cleanest single-command run
- Manual build and run for local grading/demo environments

The app is designed to work from the same origin in production, which removes the need to hardcode a backend URL.

## Configuration Management

The project now uses environment variables for deployment-sensitive values:

- `JWT_SECRET` for authentication security
- `PORT` for runtime binding
- `FRONTEND_URL` for allowed browser origins
- `VITE_API_URL` for optional split frontend/backend hosting

This improves portability and keeps secrets out of source files.

## Requirements vs Outcomes

| Requirement Area | Outcome |
|------------------|---------|
| User registration/login | Implemented |
| Protected application tracking | Implemented |
| CRUD for job applications | Implemented |
| Status summaries | Implemented |
| Search and filtering | Implemented |
| Automated backend testing artifacts | Implemented |
| Deployment documentation | Implemented |
| Durable hosted database | Partially met; JSON store still in use |

## System Quality Evaluation

The system is in a stable demo-ready state:

- Authentication routes and protected application routes are implemented
- Dashboard supports core CRUD tasks and summary visibility
- Invalid statuses are now rejected at the API level
- Environment handling is cleaner for deployment

Primary limitation:

- Persistent storage still uses a JSON file instead of PostgreSQL

## Work in Progress

- Final PDF report formatting
- Screenshot/evidence capture for submission
- Optional hosted deployment execution

## Risks and Mitigation Updates

| Risk | Severity | Mitigation |
|------|----------|-----------|
| JSON file persistence on hosted platform | Medium | Use Docker/local demo or migrate to PostgreSQL later |
| Late submission pressure | High | Prioritized deployable repo and final report structure first |
| Limited monitoring/analytics | Low | `/health` endpoint and service logs available |

## Project Management Updates

- Deployment tasks were prioritized ahead of optional enhancements
- Report structure was aligned with sample documents
- The repo now contains the missing late-semester artifacts needed for submission

## Final Readiness Assessment

The project is ready for:

- instructor demo
- final report conversion to PDF
- repository push
- container-based deployment

The main remaining step is executing the chosen hosting workflow and capturing screenshots/evidence from the live system.

## Backup and Recovery Plan

Critical data:

- `backend/src/data/database.json`

Backup approach:

1. Copy the JSON data file before deployment changes.
2. Keep dated backup copies outside the runtime environment.

Recovery approach:

1. Restore the latest valid JSON backup.
2. Restart the service.
3. Verify `/health` and a login/application retrieval workflow.

## Maintenance Planning and Versioning

- Keep configuration in environment variables
- Use semantic commit messages once the repo is pushed
- Log defects and fixes in `docs/testing/defect-log.md`
- Plan PostgreSQL migration as the next major improvement

## Logging and Monitoring

- `/health` endpoint confirms service availability
- Runtime logs capture backend exceptions
- Hosted platform logs should be checked after deployment and after demo runs

## Plan for Final Submission

1. Build and run the application using Docker or local production steps
2. Capture screenshots of login, dashboard, summary, and CRUD workflow
3. Export Progress Report 4 and Final Report to PDF
4. Push repository and deploy
5. Rehearse live demo workflow

## Reflection

The largest gap at this stage was not feature implementation but production readiness. Converting the project from a classroom build into a repeatable deployment package required simplifying the architecture, externalizing configuration, and documenting recovery and maintenance steps. That work improved the project more than adding extra features would have.

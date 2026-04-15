# Final Report - Job Application Tracker
**Student:** Stanley Okafor (101529064)  
**Course:** COMP 2154 - System Development Project

## Abstract

Job Application Tracker is a full-stack web application that centralizes job-search activity in a single system. It allows users to register, sign in, record applications, update progress, search and filter records, and review summary metrics across their hiring pipeline. The final implementation uses a React frontend and an Express backend with JWT-based authentication and a lightweight file-based persistence layer. The project demonstrates requirements analysis, system design, implementation, testing, deployment preparation, and final reflection across the software development lifecycle.

## Introduction

Many job seekers rely on scattered notes, browser bookmarks, spreadsheets, and emails to manage application progress. This leads to missed follow-ups, poor visibility into status, and duplicated effort. The objective of this project was to design and implement a centralized application tracker that is simple enough for quick daily use while still supporting the core workflow expected in a real hiring process.

## Requirements Summary

### Business Need and Problem Statement

The system addresses the need for an organized and secure way to manage job applications in one place.

### Key Stakeholders

- primary user/job seeker
- course evaluator/instructor
- future maintainers of the codebase

### High-Level Goals and Scope

In scope:

- user registration and login
- authenticated CRUD for applications
- status tracking
- search/filter support
- testing documentation
- deployment preparation

Out of scope for the final build:

- multi-user collaboration
- email reminders
- PostgreSQL migration
- analytics/report exports

### Functional Requirements

- register a user account
- authenticate with email and password
- create a job application record
- edit and delete an application
- view all applications for the authenticated user
- filter by status
- search by company or job title
- view application totals by status

### Non-Functional Requirements

- secure password hashing
- route protection through JWT
- predictable deployment configuration
- basic error handling
- maintainable project structure

## System Architecture

### Architecture Layers

- Presentation layer: React 18 + Vite
- Application layer: Node.js + Express
- Data layer: JSON file store
- Security layer: bcrypt password hashing + JWT authentication

### Layered Architecture Diagram

```text
Browser
  -> React frontend
  -> fetch API requests
Express backend
  -> auth routes
  -> protected application routes
JSON data store
```

### Integration Sequence

1. User registers or logs in.
2. Backend validates credentials and returns a JWT.
3. Frontend stores token locally.
4. Frontend sends token on protected requests.
5. Backend authorizes request and performs CRUD on stored applications.
6. Frontend refreshes dashboard data and summary metrics.

## Implementation Overview

### Key Implemented Modules

- `backend/src/routes/authRoutes.js`
- `backend/src/routes/applicationRoutes.js`
- `backend/src/middleware/auth.js`
- `backend/src/data/store.js`
- `frontend/src/pages/LoginPage.jsx`
- `frontend/src/pages/RegisterPage.jsx`
- `frontend/src/pages/DashboardPage.jsx`

### Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite |
| Backend | Node.js, Express |
| Auth | JWT, bcryptjs |
| Testing | Jest, Supertest |
| Deployment | Docker, Render-ready config |

## Testing and Quality Assurance

Testing work covered authentication, authorization, CRUD flows, and infrastructure checks. The project includes a test strategy, test case catalog, and defect log in the `docs/testing` folder.

### Testing Metrics

Planned/recorded coverage areas:

- authentication
- protected route access
- application CRUD
- summary endpoint
- health check

### Defect Tracking

Resolved issues included:

- insecure password hashing
- login password verification bug
- missing edit/delete UI
- missing filter/search UI
- hardcoded API URL

Open limitation:

- JSON data storage remains in place instead of PostgreSQL

## Deployment and Operations

### Deployment Steps

The final project supports a single-service production deployment:

1. Build the frontend
2. Serve static assets from the backend
3. Run the backend service with environment variables

Docker packaging is included for repeatable deployment.

### Backup Strategy

The main data asset is `backend/src/data/database.json`. Backups should be taken before release/demo runs and stored externally so the data can be restored if needed.

## Project Management and Process

The project followed the COMP 2154 lifecycle from requirements to final readiness:

- requirements gathering
- project proposal
- architecture planning
- testing and defect logging
- integration
- deployment preparation
- final reflection

Late-stage effort focused on delivery quality rather than expanding scope.

## Reflection

The project confirmed that testing and deployment planning expose weaknesses that pure feature work does not. The most important improvements came from security fixes, environment configuration cleanup, and simplifying deployment into a single-service architecture. If the project continued beyond the course, the first upgrade would be replacing the JSON store with PostgreSQL and adding stronger operational monitoring.

## Conclusion and Future Work

Job Application Tracker meets its core academic and functional goals. It provides a usable end-to-end workflow, demonstrates full-stack integration, and is prepared for deployment and final demonstration.

Recommended future work:

- migrate persistence to PostgreSQL
- add password strength validation
- add interview reminder notifications
- add export/reporting support
- add frontend loading and error states

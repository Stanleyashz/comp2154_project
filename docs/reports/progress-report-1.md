# Progress Report 1 - Job Application Tracker
**Student:** Stanley Okafor (101529064)  
**Course:** COMP 2154 - System Development Project  
**Due Date:** March 14, 2026  
**Focus:** System Design and Architecture

---

## 1. Executive Summary / This Week in Brief

This week focused on moving the Job Application Tracker from the planning phase into concrete technical design. The main work completed was clarifying the system architecture, defining the major layers of the application, outlining the API structure, and preparing the project foundation for implementation. The design emphasizes a simple full-stack structure that can be implemented quickly while still supporting later improvements.

---

## 2. Milestones and Completed Work

| Milestone | Status | Notes |
|-----------|--------|-------|
| Project idea confirmed | Complete | Job Application Tracker selected as the system focus |
| Problem and scope clarified | Complete | Scope aligned to must-have tracking workflow |
| Initial architecture defined | Complete | 3-layer architecture documented |
| API endpoint outline created | Complete | Auth and application endpoints identified |
| Data model direction identified | Complete | User + application record structure established |

---

## 3. Work in Progress

- Refining the backend structure for authentication and CRUD routes
- Preparing the initial data layer
- Planning the frontend dashboard and user workflow
- Expanding design notes into implementation tasks

---

## 4. Blockers and Risks

| Issue / Risk | Impact | Response |
|--------------|--------|----------|
| Time pressure across multiple deliverables | Medium | Keep scope limited to core features |
| Need to balance architecture with implementation speed | Medium | Choose a simple layered approach |
| Database complexity could slow early delivery | Medium | Start with lightweight persistence and plan later upgrade |

---

## 5. Plan for Next Week

- Begin implementation of authentication routes
- Build initial application CRUD endpoints
- Set up frontend structure for login, registration, and dashboard
- Begin testing and QA planning documents

---

## 6. Architecture and Design Updates

### Architecture Overview

The current system design follows a simple layered structure:

- Presentation Layer: React frontend
- Application Layer: Express API
- Data Layer: JSON file store initially, with PostgreSQL planned later

### Major Components

| Component | Role |
|-----------|------|
| Login/Register UI | User authentication entry points |
| Dashboard UI | Main application management screen |
| Auth Routes | Registration and login logic |
| Application Routes | CRUD and summary operations |
| Data Store | Persistence for users and applications |

### Initial API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/applications`
- `GET /api/applications/summary`
- `POST /api/applications`
- `PUT /api/applications/:id`
- `DELETE /api/applications/:id`

---

## 7. Project Management Updates

- Project planning artifacts have been aligned with the course timeline
- Architecture notes are documented and ready to support implementation
- The backlog has been organized around core workflow delivery rather than optional enhancements

---

## 8. Reflection

This phase showed that a clear architecture is necessary before implementation begins. The most important lesson this week was to keep the system simple enough to complete within the semester while still leaving room for later improvements such as PostgreSQL migration and enhanced account management. The design decisions made here support a practical build path for the rest of the course.

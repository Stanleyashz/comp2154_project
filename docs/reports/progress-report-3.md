# Progress Report 3 — Job Application Tracker
**Student:** Stanley Okafor (101529064)
**Course:** COMP 2154 — System Development Project
**Due:** Saturday, March 28, 2026 @ 11:59 PM
**Covers:** Week 9 (Part 1 — Development) + Week 10 (Part 2 — Testing & Quality)
**Overall Status:** 🟢 GREEN

---

## Executive Summary

Progress Report 3 covers the integration, testing, and quality improvement phase of the Job Application Tracker. During Weeks 9–10, the core backend and frontend were connected and validated end-to-end, a full automated test suite was written and executed (17 test cases, 100% pass rate), and seven defects were identified — six of which were fully resolved. The system now provides a working full-stack experience: register, login, add/edit/delete/filter applications, and view summary statistics.

**Development hours (Weeks 9–10):** ~20 hours
**Must-have features integrated:** 100%

---

## Major Milestones and Completed Work

| Milestone | Status | Completion Week | Owner | Key Deliverable |
|-----------|--------|-----------------|-------|-----------------|
| Backend API (auth + CRUD) | ✅ Complete | Week 9 | Stanley | `authRoutes.js`, `applicationRoutes.js` |
| Frontend (Login, Register, Dashboard) | ✅ Complete | Week 9 | Stanley | `LoginPage.jsx`, `RegisterPage.jsx`, `DashboardPage.jsx` |
| Frontend–Backend integration | ✅ Complete | Week 9 | Stanley | End-to-end login → dashboard flow |
| Test suite (Jest + Supertest) | ✅ Complete | Week 10 | Stanley | `auth.test.js`, `applications.test.js` — 17 cases |
| Edit/Delete UI for applications | ✅ Complete | Week 10 | Stanley | Inline edit mode + delete with confirmation |
| Filter/Search UI on dashboard | ✅ Complete | Week 10 | Stanley | Status dropdown + company/role search |
| Critical security fixes (bcrypt, await) | ✅ Complete | Week 10 | Stanley | `password.js`, `authRoutes.js` |
| Environment variable for API URL | ✅ Complete | Week 10 | Stanley | `VITE_API_URL`, `.env.example` |

---

## Part 1: Development Progress (Week 9)

### Components Implemented
- **Backend:** Express server, CORS, JSON body parsing, error handling middleware, JWT auth middleware, `/health` endpoint, auth routes, application routes, file-based data store with UUID generation
- **Frontend:** React 18 + Vite, view-based routing (login/register/dashboard), localStorage token persistence, dashboard with add form, summary panel, and applications table

### System Integration
- Frontend connects to backend over HTTP (CORS configured)
- JWT token issued on login/register, stored in `localStorage`, sent as `Authorization: Bearer` header on all application requests
- End-to-end workflow verified: Register → Login → Add Application → View in Table → Summary updates

### Architecture (Current)
```
Browser (React/Vite)
    │
    │  HTTP fetch (JSON)
    ▼
Express Server (Node.js — port 5000)
    │
    ├── POST /api/auth/register ──► Store: createUser()
    ├── POST /api/auth/login ─────► Store: findUserByEmail() + comparePassword()
    │
    └── /api/applications (JWT protected)
        ├── GET    /           ──► Store: getApplicationsForUser() + filter
        ├── GET    /summary    ──► Store: getApplicationsForUser() + reduce
        ├── POST   /           ──► Store: createApplication()
        ├── PUT    /:id        ──► Store: updateApplication()
        └── DELETE /:id        ──► Store: deleteApplication()
                                         │
                                         ▼
                               database.json (file-based store)
```

### Technical Challenges Encountered
1. **ESM + Jest compatibility** — Node.js ES Modules require `--experimental-vm-modules` flag for Jest. Resolved by adding the flag to the test script and creating `jest.config.js`.
2. **Isolated test databases** — Tests were modifying the development `database.json`. Resolved by making `databasePath` configurable via `process.env.DB_PATH`, allowing each test suite to use a temporary file.

---

## Part 2: Testing Execution & Quality (Week 10)

### Testing Execution Results

| Test Category        | # Cases | Passed | Failed | Notes                                       |
|----------------------|---------|--------|--------|---------------------------------------------|
| Authentication       |    6    |    6   |    0   | DEF-004 caught and fixed during run         |
| Security / Auth Guard|    2    |    2   |    0   | All protected routes correctly return 401   |
| Application CRUD     |    8    |    8   |    0   | Full create, read, filter, update, delete   |
| Health / Infra       |    1    |    1   |    0   | /health returns OK                          |
| **TOTAL**            | **17**  | **17** | **0**  | **100% pass rate after defect fixes**       |

**Tools used:** Jest 30, Supertest 7, Node.js `--experimental-vm-modules`

### Defects Found and Resolved

| Defect ID | Description | Severity | Status |
|-----------|-------------|----------|--------|
| DEF-001 | No edit UI in dashboard | Major | ✅ Resolved |
| DEF-002 | No delete UI in dashboard | Major | ✅ Resolved |
| DEF-003 | JSON file store instead of PostgreSQL | Minor | Open (Week 11) |
| DEF-004 | `comparePassword` not awaited — login bypassed | 🔴 Critical | ✅ Resolved |
| DEF-005 | SHA256 used for password hashing | 🔴 Critical | ✅ Resolved |
| DEF-006 | API URL hardcoded in frontend | Minor | ✅ Resolved |
| DEF-007 | No filter/search UI on dashboard | Minor | ✅ Resolved |

**Resolution rate:** 6/7 defects resolved. 1 minor defect (DEF-003) deferred to Week 11.

### Quality Improvements Made
- Password hashing upgraded from SHA256 to `bcryptjs` (cost factor 12)
- Missing `await` on `comparePassword` fixed — previously all logins were accepted
- Edit/Delete functionality added to dashboard table
- Filter by status and search by company/role added to dashboard
- Frontend API URL made configurable via environment variable
- Test isolation ensured by configurable `DB_PATH` in data store

---

## Work in Progress

- DEF-003: PostgreSQL migration (planned Week 11)
- Deployment to Render.com (backend) and Vercel (frontend) — Week 11 focus
- Final polish: loading states, better error UX, password strength validation

---

## Updated Architecture and Integration Overview

The system follows a three-tier architecture:

| Layer | Technology | Status |
|-------|------------|--------|
| Presentation | React 18 + Vite | ✅ Integrated |
| Application | Node.js + Express | ✅ Integrated |
| Data | JSON file store → PostgreSQL | 🟡 Partial (JSON currently, PG planned) |
| Security | JWT (24h), bcrypt (cost 12) | ✅ Fully implemented |

---

## Project Management Updates

- Kanban tasks for Week 10 completed: Edit UI, Delete UI, Jest setup, test execution, defect resolution
- Repository active with regular commits
- All resolved defects tracked in `docs/testing/defect-log.md`

---

## Lessons Learned

- **Test early:** `TC-AUTH-005` discovered a critical authentication bypass (`comparePassword` not awaited) that would have been invisible without automated testing
- **ESM compatibility matters:** Node.js ESM modules require explicit Jest configuration — not default behavior
- **Security defaults:** SHA256 is not appropriate for password hashing; bcrypt (or argon2) should be the default from day one

---

## Risks and Mitigation

| Risk | Severity | Mitigation |
|------|----------|-----------|
| PostgreSQL not connected yet | Medium | JSON store is functional; PG migration scoped to Week 11 |
| Deployment time pressure | Medium | Backend deploy to Render, frontend to Vercel — both have free tiers |
| No refresh token | Low | 24h JWT sufficient for course demo; document as known limitation |

---

## Plan for Final Phase (Week 11–14)

1. **Week 11:** Deploy backend to Render.com, frontend to Vercel; document deployment steps
2. **Week 12:** Project review — compare implemented features vs original requirements; write Progress Report 4
3. **Week 13:** Final Report — executive summary, architecture, testing evidence, deployment, lessons learned
4. **Week 14:** Final Presentation & Demo — live walkthrough of all features

---

## Reflection

The testing phase revealed that automated tests pay for themselves immediately — two critical security defects were caught within the first test run that would have been shipped to production undetected. Building the test infrastructure early (Jest config, isolated DB path, auth helper) made writing subsequent tests fast and reliable. In future projects, the testing framework and at least one test per major route should be set up before implementing business logic.

# Defect Log — Job Application Tracker
**Student:** Stanley Okafor (101529064)
**Course:** COMP 2154

| Defect ID | Description | Severity | Status | Fixed Week | Notes |
|-----------|-------------|----------|--------|------------|-------|
| DEF-001 | Dashboard did not expose edit functionality for existing applications | Major | ✅ Resolved | Week 10 | Edit button added to table; form re-used for updates via PUT endpoint |
| DEF-002 | Dashboard did not expose delete functionality | Major | ✅ Resolved | Week 10 | Delete button with confirmation added to each table row |
| DEF-003 | Data layer uses JSON file instead of PostgreSQL | Minor | Open | — | Temporary implementation to unblock development; PostgreSQL migration planned for Week 11 deployment phase |
| DEF-004 | `comparePassword` not awaited in login route — all passwords accepted | 🔴 Critical | ✅ Resolved | Week 10 | `authRoutes.js` missing `await` after bcrypt migration; caught by TC-AUTH-005 automated test |
| DEF-005 | Password hashing used SHA256 (not bcrypt) — insecure | 🔴 Critical | ✅ Resolved | Week 10 | Migrated `password.js` to `bcryptjs` with cost factor 12; old database cleared |
| DEF-006 | API base URL hardcoded as `http://localhost:5000` in frontend | Minor | ✅ Resolved | Week 10 | Changed to `import.meta.env.VITE_API_URL` with localhost fallback; `.env.example` added |
| DEF-007 | No filter or search UI on dashboard | Minor | ✅ Resolved | Week 10 | Status filter dropdown and company/role search input added; react to changes via `useEffect` dependency |

---

## Defect Resolution Summary

| Priority | Total Found | Resolved | Open |
|----------|-------------|----------|------|
| 🔴 Critical | 2 | 2 | 0 |
| 🟠 Major    | 2 | 2 | 0 |
| 🟡 Minor    | 3 | 2 | 1 |
| **Total**   | **7** | **6** | **1** |

All critical and major defects have been resolved. The remaining open defect (DEF-003, JSON vs PostgreSQL) is tracked and scheduled for the deployment phase (Week 11).

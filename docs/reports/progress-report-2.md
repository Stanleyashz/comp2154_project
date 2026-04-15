# Progress Report 2 — Job Application Tracker
**Student:** Stanley Okafor (101529064)
**Course:** COMP 2154 — System Development Project
**Due:** Saturday, March 21, 2026 @ 11:59 PM
**Focus:** Testing & QA Planning (Week 5 deliverable)

---

## Summary of This Week

Week 5 activities focused on establishing a complete testing and quality assurance framework for the Job Application Tracker. The test strategy was designed, a minimum of 8 test cases were written and formalized, and the testing tools (Jest and Supertest) were installed and configured. The defect tracking process was established using a structured defect log with severity classifications.

---

## Work Completed

### Test Strategy Established
- Defined a four-tier testing approach: Unit, Integration, System, and Acceptance
- Selected **Jest** (test runner) and **Supertest** (HTTP integration testing) as the testing tools
- Established defect severity levels: Critical, Major, Minor
- Documented the defect resolution cycle: identify → reproduce → fix → re-test → confirm

### Test Cases Designed
Seventeen (17) formal test cases written and documented in `docs/testing/test-cases.md`:

| Category | Cases |
|----------|-------|
| Authentication (register, login, validation) | 6 |
| Security / Authorization guards | 2 |
| Application CRUD (create, read, filter, update, delete) | 8 |
| Health / Infrastructure | 1 |
| **Total** | **17** |

### Testing Tools Setup
- Installed `jest@30` and `supertest@7` as dev dependencies
- Configured Jest for ESM (Node `--experimental-vm-modules`)
- Created `jest.config.js` with test file matching and 10-second timeout
- Added `npm test` and `npm test:coverage` scripts to `package.json`
- Created isolated database path mechanism via `process.env.DB_PATH` so tests do not affect the development database

### Test Files Created
- `backend/src/__tests__/auth.test.js` — 7 tests covering registration, login, validation
- `backend/src/__tests__/applications.test.js` — 10 tests covering CRUD and security

### QA Processes Established
- All defects tracked with ID, description, severity, status, owner, and fix week
- Critical and Major defects prioritized over Minor
- Test cases re-run after every defect fix to confirm resolution
- Defect log maintained in `docs/testing/defect-log.md`

---

## Testing Execution Results

All 17 test cases were executed via Jest and passed successfully:

```
Test Suites: 2 passed, 2 total
Tests:       17 passed, 17 total
Time:        ~15s
```

No test failures after all defects were resolved.

---

## Known Issues / Defects Found During Testing

| Defect ID | Description | Severity | Status |
|-----------|-------------|----------|--------|
| DEF-004 | `comparePassword` not awaited — login accepted all passwords | Critical | Resolved |
| DEF-005 | SHA256 password hashing used instead of bcrypt | Critical | Resolved |

Both critical defects were identified by automated test `TC-AUTH-005` and fixed within the same session.

---

## Plan for Next Week (Week 10 — Progress Report 3)

- Execute full system tests via browser and Postman
- Log all defects with evidence (screenshots)
- Fix remaining major defects (DEF-001, DEF-002 — edit/delete UI)
- Capture screenshots as evidence for Progress Report 3
- Begin drafting PR3 Part 1 (development progress) and PR3 Part 2 (testing/quality)
- Submit Progress Report 3 by Saturday, March 28

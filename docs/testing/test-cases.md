# Test Cases — Job Application Tracker
**Student:** Stanley Okafor (101529064)
**Course:** COMP 2154 — Progress Report 2 & 3
**Total Cases:** 17 (automated via Jest + Supertest)

---

## Authentication Tests

### TC-AUTH-001 — Successful Registration
- **Requirement Ref:** FR-1 — User Registration
- **Priority:** High
- **Test Level:** Integration / System
- **Test Type:** Positive
- **Pre-Conditions:** Backend running, email not already registered
- **Steps:**
  1. POST `/api/auth/register` with valid name, email, password
- **Expected Result:** HTTP 201, user object returned, token included, passwordHash NOT exposed
- **Status:** ✅ Pass

### TC-AUTH-002 — Duplicate Email Rejection
- **Requirement Ref:** FR-1 — User Registration
- **Priority:** High
- **Test Level:** Integration
- **Test Type:** Negative
- **Pre-Conditions:** User with same email already exists
- **Steps:**
  1. POST `/api/auth/register` with same email twice
- **Expected Result:** HTTP 409, error message "already registered"
- **Status:** ✅ Pass

### TC-AUTH-003 — Missing Fields Rejected
- **Requirement Ref:** FR-1 — Input Validation
- **Priority:** Medium
- **Test Level:** Integration
- **Test Type:** Negative (Edge Case)
- **Pre-Conditions:** Backend running
- **Steps:**
  1. POST `/api/auth/register` with email only (name, password omitted)
- **Expected Result:** HTTP 400, error response
- **Status:** ✅ Pass

### TC-AUTH-004 — Successful Login
- **Requirement Ref:** FR-2 — User Authentication
- **Priority:** High
- **Test Level:** Integration / System
- **Test Type:** Positive
- **Pre-Conditions:** User account exists
- **Steps:**
  1. POST `/api/auth/login` with correct email and password
- **Expected Result:** HTTP 200, JWT token returned, user object included
- **Status:** ✅ Pass

### TC-AUTH-005 — Wrong Password Rejected
- **Requirement Ref:** FR-2 — User Authentication
- **Priority:** High
- **Test Level:** Integration
- **Test Type:** Negative
- **Pre-Conditions:** User account exists
- **Steps:**
  1. POST `/api/auth/login` with correct email, wrong password
- **Expected Result:** HTTP 401, authentication error
- **Status:** ✅ Pass *(caught real defect DEF-004 — missing `await` on comparePassword)*

### TC-AUTH-006 — Unknown Email Rejected
- **Requirement Ref:** FR-2 — User Authentication
- **Priority:** High
- **Test Level:** Integration
- **Test Type:** Negative
- **Pre-Conditions:** None
- **Steps:**
  1. POST `/api/auth/login` with unregistered email
- **Expected Result:** HTTP 401
- **Status:** ✅ Pass

---

## Application CRUD Tests

### TC-SEC-001 — Unauthorized GET Access
- **Requirement Ref:** FR-3 — Route Protection
- **Priority:** High
- **Test Level:** Security
- **Test Type:** Negative
- **Pre-Conditions:** No auth token provided
- **Steps:**
  1. GET `/api/applications` without Authorization header
- **Expected Result:** HTTP 401
- **Status:** ✅ Pass

### TC-SEC-002 — Unauthorized POST Access
- **Requirement Ref:** FR-3 — Route Protection
- **Priority:** High
- **Test Level:** Security
- **Test Type:** Negative
- **Pre-Conditions:** No auth token
- **Steps:**
  1. POST `/api/applications` without Authorization header
- **Expected Result:** HTTP 401
- **Status:** ✅ Pass

### TC-APP-001 — Create Application
- **Requirement Ref:** FR-4 — Add Job Application
- **Priority:** High
- **Test Level:** Integration / System
- **Test Type:** Positive
- **Pre-Conditions:** Authenticated user
- **Steps:**
  1. POST `/api/applications` with company, jobTitle, dateApplied, status
- **Expected Result:** HTTP 201, application object with generated id
- **Status:** ✅ Pass

### TC-APP-002 — Missing Required Fields
- **Requirement Ref:** FR-4 — Input Validation
- **Priority:** Medium
- **Test Level:** Integration
- **Test Type:** Negative (Edge Case)
- **Pre-Conditions:** Authenticated user
- **Steps:**
  1. POST `/api/applications` with only companyName
- **Expected Result:** HTTP 400, error response
- **Status:** ✅ Pass

### TC-APP-003 — Get Applications
- **Requirement Ref:** FR-5 — View Applications
- **Priority:** High
- **Test Level:** Integration
- **Test Type:** Positive
- **Pre-Conditions:** Authenticated user
- **Steps:**
  1. GET `/api/applications`
- **Expected Result:** HTTP 200, applications array, count field
- **Status:** ✅ Pass

### TC-APP-004 — Filter by Status
- **Requirement Ref:** FR-6 — Filter Applications
- **Priority:** Medium
- **Test Level:** Integration
- **Test Type:** Positive
- **Pre-Conditions:** Authenticated user, applications with varied statuses
- **Steps:**
  1. GET `/api/applications?status=Interview Scheduled`
- **Expected Result:** HTTP 200, only matching-status applications returned
- **Status:** ✅ Pass

### TC-APP-005 — Summary Endpoint
- **Requirement Ref:** FR-7 — Summary Dashboard
- **Priority:** Medium
- **Test Level:** Integration
- **Test Type:** Positive
- **Pre-Conditions:** Authenticated user
- **Steps:**
  1. GET `/api/applications/summary`
- **Expected Result:** HTTP 200, total count and byStatus breakdown
- **Status:** ✅ Pass

### TC-APP-006 — Update Application
- **Requirement Ref:** FR-8 — Edit Application
- **Priority:** High
- **Test Level:** Integration / System
- **Test Type:** Positive
- **Pre-Conditions:** Authenticated user, existing application
- **Steps:**
  1. PUT `/api/applications/:id` with updated status and notes
- **Expected Result:** HTTP 200, updated application object
- **Status:** ✅ Pass

### TC-APP-007 — Update Non-Existent Application
- **Requirement Ref:** FR-8 — Error Handling
- **Priority:** Medium
- **Test Level:** Integration
- **Test Type:** Negative
- **Pre-Conditions:** Authenticated user
- **Steps:**
  1. PUT `/api/applications/non-existent-id-999`
- **Expected Result:** HTTP 404
- **Status:** ✅ Pass

### TC-APP-008 — Delete Application
- **Requirement Ref:** FR-9 — Delete Application
- **Priority:** High
- **Test Level:** Integration / System
- **Test Type:** Positive
- **Pre-Conditions:** Authenticated user, existing application
- **Steps:**
  1. DELETE `/api/applications/:id`
  2. GET `/api/applications` — confirm deleted item absent
- **Expected Result:** HTTP 200 on delete, item no longer in list
- **Status:** ✅ Pass

---

## Health Check

### TC-HEALTH-001 — API Health Check
- **Requirement Ref:** Non-functional — Availability
- **Priority:** Low
- **Test Level:** System
- **Test Type:** Positive
- **Steps:**
  1. GET `/health`
- **Expected Result:** HTTP 200, `{"status":"OK"}`
- **Status:** ✅ Pass

---

## Testing Metric Summary

| Test Category        | # Cases | Passed | Failed | Notes                                      |
|----------------------|---------|--------|--------|--------------------------------------------|
| Authentication       |    6    |    6   |    0   | DEF-004 caught and fixed during testing    |
| Security / Auth Guard|    2    |    2   |    0   | All protected routes correctly guarded     |
| Application CRUD     |    8    |    8   |    0   | Create, Read, Filter, Update, Delete       |
| Health / Infra       |    1    |    1   |    0   | Health endpoint confirmed                  |
| **TOTAL**            | **17**  | **17** | **0**  | **100% pass rate**                         |

**Tools used:** Jest 30, Supertest 7, Node.js `--experimental-vm-modules`

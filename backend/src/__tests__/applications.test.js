/**
 * Application CRUD Endpoint Tests — TC-APP-001 through TC-APP-007
 * Student: Stanley Okafor (101529064)
 * Course: COMP 2154 — Progress Report 2 & 3
 */

import os from "node:os";
import path from "node:path";
import fs from "node:fs/promises";

// Isolated temp database for this test suite
const testDbPath = path.join(os.tmpdir(), `jat-app-test-${Date.now()}.json`);
process.env.DB_PATH = testDbPath;

const { app } = await import("../app.js");
const { default: request } = await import("supertest");

let authToken = "";

beforeAll(async () => {
  // Register and login to obtain a token for protected routes
  const email = `apptest-${Date.now()}@test.com`;
  await request(app)
    .post("/api/auth/register")
    .send({ name: "App Tester", email, password: "testpass99" });

  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({ email, password: "testpass99" });

  authToken = loginRes.body.token;
});

afterAll(async () => {
  try {
    await fs.unlink(testDbPath);
  } catch {
    // ignore
  }
});

// Helper — authenticated request
function authReq(method, url) {
  return request(app)[method](url).set("Authorization", `Bearer ${authToken}`);
}

// ─── TC-SEC-001: Unauthorized access ─────────────────────────────────────────
describe("Protected route security", () => {
  test("TC-SEC-001 — GET /api/applications without token returns 401", async () => {
    const res = await request(app).get("/api/applications");
    expect(res.status).toBe(401);
  });

  test("TC-SEC-002 — POST /api/applications without token returns 401", async () => {
    const res = await request(app).post("/api/applications").send({
      companyName: "Ghost Corp",
      jobTitle: "Dev",
      dateApplied: "2026-03-17",
      status: "Applied"
    });
    expect(res.status).toBe(401);
  });
});

// ─── TC-APP-001: Create application ──────────────────────────────────────────
describe("POST /api/applications", () => {
  test("TC-APP-001 — creates application with valid data", async () => {
    const res = await authReq("post", "/api/applications").send({
      companyName: "Google",
      jobTitle: "Software Engineer",
      dateApplied: "2026-03-17",
      status: "Applied",
      jobUrl: "https://careers.google.com",
      notes: "Exciting role"
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Application created successfully");
    expect(res.body.application.companyName).toBe("Google");
    expect(res.body.application).toHaveProperty("id");
  });

  test("TC-APP-002 — rejects application with missing required fields (400)", async () => {
    const res = await authReq("post", "/api/applications").send({
      companyName: "Microsoft"
      // jobTitle, dateApplied, status omitted
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});

// ─── TC-APP-003: Get applications ────────────────────────────────────────────
describe("GET /api/applications", () => {
  test("TC-APP-003 — returns authenticated user's applications", async () => {
    const res = await authReq("get", "/api/applications");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("applications");
    expect(Array.isArray(res.body.applications)).toBe(true);
    expect(res.body).toHaveProperty("count");
  });

  test("TC-APP-004 — filters applications by status", async () => {
    // Add an application with a distinct status
    await authReq("post", "/api/applications").send({
      companyName: "Meta",
      jobTitle: "React Developer",
      dateApplied: "2026-03-17",
      status: "Interview Scheduled"
    });

    const res = await authReq("get", "/api/applications?status=Interview Scheduled");
    expect(res.status).toBe(200);
    res.body.applications.forEach((app) => {
      expect(app.status).toBe("Interview Scheduled");
    });
  });
});

// ─── TC-APP-005: Summary ──────────────────────────────────────────────────────
describe("GET /api/applications/summary", () => {
  test("TC-APP-005 — returns summary with total and byStatus", async () => {
    const res = await authReq("get", "/api/applications/summary");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("total");
    expect(res.body).toHaveProperty("byStatus");
    expect(typeof res.body.total).toBe("number");
  });
});

// ─── TC-APP-006: Update application ──────────────────────────────────────────
describe("PUT /api/applications/:id", () => {
  test("TC-APP-006 — updates status of existing application", async () => {
    // Create one
    const create = await authReq("post", "/api/applications").send({
      companyName: "Amazon",
      jobTitle: "Backend Engineer",
      dateApplied: "2026-03-17",
      status: "Applied"
    });

    const id = create.body.application.id;

    const update = await authReq("put", `/api/applications/${id}`).send({
      companyName: "Amazon",
      jobTitle: "Backend Engineer",
      dateApplied: "2026-03-17",
      status: "Interview Scheduled",
      notes: "Phone screen booked"
    });

    expect(update.status).toBe(200);
    expect(update.body.application.status).toBe("Interview Scheduled");
    expect(update.body.application.notes).toBe("Phone screen booked");
  });

  test("TC-APP-007 — returns 404 for non-existent application id", async () => {
    const res = await authReq("put", "/api/applications/non-existent-id-999").send({
      companyName: "Ghost",
      jobTitle: "Dev",
      dateApplied: "2026-03-17",
      status: "Applied"
    });

    expect(res.status).toBe(404);
  });
});

// ─── TC-APP-008: Delete application ──────────────────────────────────────────
describe("DELETE /api/applications/:id", () => {
  test("TC-APP-008 — deletes an existing application", async () => {
    const create = await authReq("post", "/api/applications").send({
      companyName: "Tesla",
      jobTitle: "Full Stack Dev",
      dateApplied: "2026-03-17",
      status: "Applied"
    });

    const id = create.body.application.id;
    const del = await authReq("delete", `/api/applications/${id}`);

    expect(del.status).toBe(200);
    expect(del.body.message).toBe("Application deleted successfully");

    // Confirm it no longer appears in the list
    const listRes = await authReq("get", "/api/applications");
    const ids = listRes.body.applications.map((a) => a.id);
    expect(ids).not.toContain(id);
  });
});

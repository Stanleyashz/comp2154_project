/**
 * Auth Endpoint Tests — TC-AUTH-001 through TC-AUTH-004
 * Student: Stanley Okafor (101529064)
 * Course: COMP 2154 — Progress Report 2 & 3
 */

import { jest } from "@jest/globals";
import os from "node:os";
import path from "node:path";
import fs from "node:fs/promises";

// Point the store at a temporary file so tests don't touch the real database
const testDbPath = path.join(os.tmpdir(), `jat-auth-test-${Date.now()}.json`);
process.env.DB_PATH = testDbPath;

const { app } = await import("../app.js");
const { default: request } = await import("supertest");

afterAll(async () => {
  // Clean up temp database file
  try {
    await fs.unlink(testDbPath);
  } catch {
    // file may not exist if no tests wrote to it
  }
});

// ─── TC-AUTH-001: Successful Registration ────────────────────────────────────
describe("POST /api/auth/register", () => {
  test("TC-AUTH-001 — creates a new user and returns a token", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Stanley Okafor",
      email: `test-${Date.now()}@georgebrown.ca`,
      password: "password123"
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
    expect(res.body.user).toHaveProperty("id");
    expect(res.body.user).toHaveProperty("email");
    expect(res.body).toHaveProperty("token");
    // Password hash must NOT be exposed in response
    expect(res.body.user).not.toHaveProperty("passwordHash");
  });

  // TC-AUTH-002: Duplicate email rejection
  test("TC-AUTH-002 — rejects duplicate email with 409", async () => {
    const email = `dup-${Date.now()}@test.com`;

    await request(app)
      .post("/api/auth/register")
      .send({ name: "First User", email, password: "pass123" });

    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Second User", email, password: "pass456" });

    expect(res.status).toBe(409);
    expect(res.body.error).toContain("already registered");
  });

  test("TC-AUTH-003 — rejects registration with missing fields (400)", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "noname@test.com"
      // name and password omitted
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  test("TC-AUTH-007 — concurrent duplicate registration only creates one account", async () => {
    const email = `race-${Date.now()}@test.com`;

    const [first, second] = await Promise.all([
      request(app).post("/api/auth/register").send({
        name: "Race One",
        email,
        password: "pass123"
      }),
      request(app).post("/api/auth/register").send({
        name: "Race Two",
        email,
        password: "pass456"
      })
    ]);

    const statuses = [first.status, second.status].sort((a, b) => a - b);
    expect(statuses).toEqual([201, 409]);
  });
});

// ─── TC-AUTH-002 variant: Successful Login ────────────────────────────────────
describe("POST /api/auth/login", () => {
  const credentials = {
    name: "Login Tester",
    email: `login-${Date.now()}@test.com`,
    password: "securePass99"
  };

  beforeAll(async () => {
    // Register a user so the login test has an account to authenticate against
    await request(app).post("/api/auth/register").send(credentials);
  });

  test("TC-AUTH-004 — returns token on valid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: credentials.email,
      password: credentials.password
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Login successful");
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe(credentials.email);
  });

  test("TC-AUTH-005 — rejects wrong password with 401", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: credentials.email,
      password: "wrongpassword"
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toBeDefined();
  });

  test("TC-AUTH-006 — rejects unknown email with 401", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "nobody@test.com",
      password: "anypass"
    });

    expect(res.status).toBe(401);
  });
});

// ─── TC-SEC-001: Health check ─────────────────────────────────────────────────
describe("GET /health", () => {
  test("TC-HEALTH-001 — returns OK status", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("OK");
  });
});

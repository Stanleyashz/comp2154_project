import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databasePath = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
  : path.join(__dirname, "database.json");

const defaultData = {
  users: [],
  applications: []
};

async function ensureStore() {
  try {
    await fs.access(databasePath);
  } catch {
    await fs.writeFile(databasePath, JSON.stringify(defaultData, null, 2));
  }
}

async function readStore() {
  await ensureStore();
  const raw = await fs.readFile(databasePath, "utf8");
  return JSON.parse(raw);
}

async function writeStore(data) {
  await fs.writeFile(databasePath, JSON.stringify(data, null, 2));
}

export async function getUsers() {
  const data = await readStore();
  return data.users;
}

export async function createUser(user) {
  const data = await readStore();
  const newUser = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...user
  };
  data.users.push(newUser);
  await writeStore(data);
  return newUser;
}

export async function findUserByEmail(email) {
  const users = await getUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function getApplicationsForUser(userId) {
  const data = await readStore();
  return data.applications.filter((application) => application.userId === userId);
}

export async function createApplication(application) {
  const data = await readStore();
  const timestamp = new Date().toISOString();
  const newApplication = {
    id: crypto.randomUUID(),
    createdAt: timestamp,
    updatedAt: timestamp,
    ...application
  };
  data.applications.push(newApplication);
  await writeStore(data);
  return newApplication;
}

export async function updateApplication(userId, applicationId, updates) {
  const data = await readStore();
  const index = data.applications.findIndex(
    (application) => application.id === applicationId && application.userId === userId
  );

  if (index === -1) {
    return null;
  }

  data.applications[index] = {
    ...data.applications[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  await writeStore(data);
  return data.applications[index];
}

export async function deleteApplication(userId, applicationId) {
  const data = await readStore();
  const before = data.applications.length;
  data.applications = data.applications.filter(
    (application) => !(application.id === applicationId && application.userId === userId)
  );

  if (data.applications.length === before) {
    return false;
  }

  await writeStore(data);
  return true;
}

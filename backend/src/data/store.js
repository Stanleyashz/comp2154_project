import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databasePath = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
  : path.join(__dirname, "database.json");
const databaseDirectory = path.dirname(databasePath);

const defaultData = {
  users: [],
  applications: []
};

let mutationQueue = Promise.resolve();

function cloneDefaultData() {
  return structuredClone(defaultData);
}

async function ensureStore() {
  await fs.mkdir(databaseDirectory, { recursive: true });

  try {
    await fs.access(databasePath);
  } catch {
    await writeStore(cloneDefaultData());
  }
}

async function readStore() {
  await ensureStore();
  const raw = await fs.readFile(databasePath, "utf8");
  return JSON.parse(raw);
}

async function writeStore(data) {
  const temporaryPath = `${databasePath}.${process.pid}.tmp`;
  await fs.writeFile(temporaryPath, JSON.stringify(data, null, 2));
  await fs.rename(temporaryPath, databasePath);
}

async function mutateStore(mutator) {
  const runMutation = async () => {
    const data = await readStore();
    const result = await mutator(data);
    await writeStore(data);
    return result;
  };

  const pendingMutation = mutationQueue.then(runMutation, runMutation);
  mutationQueue = pendingMutation.then(
    () => undefined,
    () => undefined
  );

  return pendingMutation;
}

export async function getUsers() {
  const data = await readStore();
  return data.users;
}

export async function createUser(user) {
  return mutateStore((data) => {
    const existingUser = data.users.find(
      (storedUser) => storedUser.email.toLowerCase() === user.email.toLowerCase()
    );

    if (existingUser) {
      return null;
    }

    const newUser = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...user
    };

    data.users.push(newUser);
    return newUser;
  });
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
  return mutateStore((data) => {
    const timestamp = new Date().toISOString();
    const newApplication = {
      id: crypto.randomUUID(),
      createdAt: timestamp,
      updatedAt: timestamp,
      ...application
    };

    data.applications.push(newApplication);
    return newApplication;
  });
}

export async function updateApplication(userId, applicationId, updates) {
  return mutateStore((data) => {
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

    return data.applications[index];
  });
}

export async function deleteApplication(userId, applicationId) {
  return mutateStore((data) => {
    const before = data.applications.length;
    data.applications = data.applications.filter(
      (application) => !(application.id === applicationId && application.userId === userId)
    );

    return data.applications.length !== before;
  });
}

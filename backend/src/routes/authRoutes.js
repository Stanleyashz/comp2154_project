import { Router } from "express";
import { createUser, findUserByEmail } from "../data/store.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { signToken } from "../utils/jwt.js";

const router = Router();

router.post("/register", async (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    return response.status(400).json({ error: "Name, email, and password are required" });
  }

  const user = await createUser({
    name,
    email,
    passwordHash: await hashPassword(password)
  });

  if (!user) {
    return response.status(409).json({ error: "Email is already registered" });
  }

  return response.status(201).json({
    message: "User registered successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    },
    token: signToken(user)
  });
});

router.post("/login", async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({ error: "Email and password are required" });
  }

  const user = await findUserByEmail(email);
  if (!user || !(await comparePassword(password, user.passwordHash))) {
    return response.status(401).json({ error: "Invalid email or password" });
  }

  return response.json({
    message: "Login successful",
    token: signToken(user),
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

export default router;

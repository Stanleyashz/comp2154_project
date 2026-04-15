import jwt from "jsonwebtoken";
import { config } from "../config.js";

export function signToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      name: user.name
    },
    config.jwtSecret,
    { expiresIn: "24h" }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, config.jwtSecret);
}

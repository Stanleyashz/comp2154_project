import { verifyToken } from "../utils/jwt.js";

export function requireAuth(request, response, next) {
  const header = request.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return response.status(401).json({ error: "Missing or invalid authorization header" });
  }

  try {
    request.user = verifyToken(token);
    return next();
  } catch {
    return response.status(401).json({ error: "Invalid or expired token" });
  }
}

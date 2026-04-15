import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import { config } from "./config.js";
import { requireAuth } from "./middleware/auth.js";

export const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");
const hasFrontendBuild = fs.existsSync(frontendDistPath);

app.use(
  cors({
    origin: config.frontendUrls
  })
);
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({
    status: "OK",
    message: "Job Application Tracker API is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/applications", requireAuth, applicationRoutes);

if (hasFrontendBuild) {
  app.use(express.static(frontendDistPath));

  app.get(/^(?!\/api|\/health).*/, (_request, response) => {
    response.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: "Internal server error" });
});

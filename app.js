import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./src/routes/auth.route.js";
import urlroutes from "./src/routes/url.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets
const frontendDistPath = path.join(__dirname, "frontend", "dist");
app.use(express.static(frontendDistPath));

// Health check API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/users", userRoutes);
app.use("/", urlroutes);

// SPA fallback for all frontend client-side routes (Home, Login, Register, Dashboard)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

export default app;
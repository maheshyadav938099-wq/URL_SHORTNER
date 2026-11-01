import "dotenv/config";
import app from "../app.js";
import { connectDB } from "../src/config/db.js";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.error("MongoDB connection failed in Vercel handler:", error.message);
    return res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }

  return app(req, res);
}

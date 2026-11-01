import "dotenv/config";
import app from "./app.js";
import mongoose from "mongoose";

const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
  const jwtSecret = process.env.JWT_SECRET;

  if (!mongoUri) {
    throw new Error("MONGODB_URI (or MONGO_URI) is not set. Add it to your .env file.");
  }

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not set. Add it to your .env file.");
  }

  await mongoose.connect(mongoUri);
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exitCode = 1;
});
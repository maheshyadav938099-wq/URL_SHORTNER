import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./src/config/db.js";

const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not set. Add it to your .env file.");
  }

  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exitCode = 1;
});
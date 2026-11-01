import mongoose from "mongoose";

let isConnecting = false;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (isConnecting) {
    // Wait for ongoing connection attempt
    while (mongoose.connection.readyState === 2) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    return mongoose.connection;
  }

  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI (or MONGO_URI) is not set.");
  }

  try {
    isConnecting = true;
    await mongoose.connect(mongoUri);
    return mongoose.connection;
  } finally {
    isConnecting = false;
  }
};

import mongoose from "mongoose";
import environment from "./environment";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(environment.mongoDbUrl);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Failed to connect to database, ", error);
  }
};

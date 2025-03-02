import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // READ THE.env FILE
const MONGODB_CONNECTION = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_CONNECTION);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Fail to connect to MongoDB", error);
  }
};

export { connectDB };

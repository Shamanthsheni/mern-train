import mongoose from "mongoose";

const DB_URI = "mongodb://127.0.0.1:27017/mernproj";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
    console.log(`MONGODB_URL: ${MONGODB_URI}`);
  } catch (err) {
    console.log("Error: ", err);
  }
};

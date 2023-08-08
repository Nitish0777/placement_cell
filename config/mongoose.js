import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`.bgMagenta.white);
  } catch (error) {
    console.log(`Error: ${error.message}`.bgRed.white);
    process.exit(1);
  }
};

export default connectDB;

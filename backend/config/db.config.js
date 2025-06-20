import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB database connected to server.");
  } catch (error) {
    console.error("Error while connecting MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;

import mongoose from "mongoose";

const connectToMongo = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/mern-assignment");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectToMongo;

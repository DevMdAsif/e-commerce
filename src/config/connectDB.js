import mongoose from "mongoose";
import { MONGODB_URL } from "../serect.js";

const connectDB = async (option) => {
    try {
        await mongoose.connect(MONGODB_URL, option);
        console.log("Connect to MongoDB successfully");
    } catch (error) {
        console.log("Connect to MongoDB failed", error);
    }
};
export default connectDB;

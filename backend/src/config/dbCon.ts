import { log } from "console";
import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connection Successful");
    } catch (err) {
        console.error("Error Connecting to mongodb",err);
        process.exit(1);
    }
}

export default connectDB;
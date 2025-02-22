import mongoose from 'mongoose'
import {DB_URI} from "../config/env.js";

if(!DB_URI)
    throw new Error("DB_URI env variable is not set properly.");


const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI)
        console.log("Connected to mongodb database successfully.")
    } catch (error){
        console.log(error)
        process.exit(1)
    }
}

export default connectToDatabase;
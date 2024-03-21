import mongoose from "mongoose";

export const connectDatabase = async (req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI).then(()=>{
            console.log('Connected to Database');
        });
    } catch (error) {
        console.log('Error Connecting to database');
    }
};
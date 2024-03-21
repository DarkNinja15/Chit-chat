import express from "express";
const app=express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import { connectDatabase } from "./db/connectToMongoDB.js";
import messageRouter from "./routes/message.route.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRouter);
app.use('/api/messages',messageRouter);

app.get('/',(req,res)=>{
    res.send("Server is running");
});


app.listen(PORT,()=>{
    connectDatabase();
    console.log(`Server listening on port ${PORT}`);
})
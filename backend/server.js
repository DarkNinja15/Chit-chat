import path from 'path';
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import { connectDatabase } from "./db/connectToMongoDB.js";
import messageRouter from "./routes/message.route.js";
import userRouter from "./routes/user.route.js";
import { app,server } from "./socket/socket.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const __dirname=path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRouter);
app.use('/api/messages',messageRouter);
app.use('/api/users',userRouter);

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

app.get('/',(req,res)=>{
    res.send("Server is running");
});


server.listen(PORT,()=>{
    connectDatabase();
    console.log(`Server listening on port ${PORT}`);
})
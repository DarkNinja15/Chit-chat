import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const messageRouter=express.Router();

messageRouter.post('/send/:id',protectRoute,sendMessage)

export default messageRouter;
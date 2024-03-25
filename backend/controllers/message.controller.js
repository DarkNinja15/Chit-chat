import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMessage = async(req,res)=>{
    try {
        const {message}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        });

        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId]
            });
        }

        console.log(conversation.messages);
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if(newMessage){
            (conversation.messages).push(newMessage._id);
        }

        await Promise.all([conversation.save(),newMessage.save()]);

        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log('Error in send message controller');
        console.log(error);
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }

        res.status(200).json(conversation.messages);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log('Error in get messages controller');
        console.log(error);
    }
};

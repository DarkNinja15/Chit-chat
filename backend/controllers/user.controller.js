import User from "../models/user.model.js";

export const getUsers = async (req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const users=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).send(users);
    } catch (error) {
        console.log('Error in get user controller');
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
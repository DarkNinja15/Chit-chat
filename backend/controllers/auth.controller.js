import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateJWT } from "../utils/generateToken.js";

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            generateJWT(user._id, res);
            return res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                gender: user.gender
            });
        }
        return res.status(400).json({error:"Username or password is incorrect"});
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log('Error in login controller');
        console.log(error);
    }

};

export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password's do not match" });
        }
        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender == "male" ? boyProfilePic : girlProfilePic
        });

        if (newUser) {
            await newUser.save();
            generateJWT(newUser._id, res);
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                gender: newUser.gender
            });
        }
        return res.status(400).json({ error: "Invalid user data" });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log('Error in signup controller');
        console.log(error);
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log('Error in logout controller');
        console.log(error);
    }
};
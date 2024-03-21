import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female","other"]
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true});

const User = mongoose.model("User",userschema);

export default User;
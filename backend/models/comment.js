import mongoose from "mongoose";

const kittySchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    },
    video:{
        type:mongoose.Schema.ObjectId,
        ref:"video"
    },
    comment:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const commentdata=mongoose.model("comment",kittySchema);

export default commentdata;
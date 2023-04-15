import mongoose from "mongoose"

const kittySchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    video:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    tags:{
        type:Array,
        default:[]
    },
    view:{
        type:Number,
        default:0
    },
    like:{
        type:Array,
        default:[]
    },
    dislike:{
        type:Array,
        default:[]
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

const  videodata=mongoose.model("video",kittySchema);
export default videodata;
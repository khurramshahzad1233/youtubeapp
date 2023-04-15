import Errorhandler from "../utils/errorhandler.js";
import catchasyncerror from "../middleware/catchasyncerror.js";
import userdata from "../models/userschema.js";
import cloudinary from "cloudinary"
import sendtoken from "../utils/sendtoken.js"

import DataUriParser from "datauri/parser.js"
import path from "path";


export const getallusercontroller=catchasyncerror(async(req,res,next)=>{
    const alluser=await userdata.find({});

    res.status(200).json({
        success:true,
        alluser
    })
});



export const registerusercontroller=catchasyncerror(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const avatar=req.files[`image`][0];

    if(!name ||!email ||!password ||!avatar){
        return next(new Errorhandler("plz enter all fields",400))
    };
  

    const parser=new DataUriParser();
    const imagedatauri=parser.format(avatar.mimetype,avatar.buffer).content;
    const imagecloud=await cloudinary.v2.uploader.upload(imagedatauri,{
        resource_type:"image",
        folder:"avatar",
        width:150,
        crop:"scale"
    },(error,imagecloud)=>{
        if(error){
            return res.status(500).send("error upload image")
        }
    });

    let user=await userdata.findOne({email});
    if(user){
        return next(new Errorhandler("user already exist",409))
    };
   

    user=await userdata.create({
        name,email,password,
        avatar:{
            public_id:imagecloud.public_id,
            url:imagecloud.secure_url,
        }
    })
    sendtoken(res,user,201,"register successfully")
});


export const logincontroller=catchasyncerror(async(req,res,next)=>{
    const {email,password}=req.body;

    if(!email ||!password){
        return next(
            new Errorhandler("Plz enter all fields",400)
        )
    };
    const user=await userdata.findOne({email}).select("+password");
    if(!user){
        return next(new Errorhandler("incorrect email or password",401))
    };
    const matchpassword=await user.comparepassword(password);
    if(!matchpassword){
        return next(new Errorhandler("incorrect email or password",401))
    };
    sendtoken(res,user,200,"welcome back")
});

export const logoutusercontroller=catchasyncerror(async(req,res,next)=>{
    res.status(200).cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
        secure:true,
        sameSite:"none"
        
    }).json({
        success:true,
        message:"logout successfully"
    })
});



export const getmyprofilecontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id);
    if(!user){
        return next(new Errorhandler("plz login to access the resource",400))
    };
    res.status(200).json({
        success:true,
        user,
    })
});


export const getsingleusercontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.params.id);
    if(!user){
        return next(new Errorhandler("user not found",404))
    };
    res.status(200).json({
        succcess:true,
        user,
    })
});
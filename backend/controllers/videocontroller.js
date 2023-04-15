import Errorhandler from "../utils/errorhandler.js"
import catchasyncerror from "../middleware/catchasyncerror.js"
import videodata from "../models/videoschema.js"
import userdata from "../models/userschema.js"

import cloudinary from "cloudinary"
import DataUriParser from "datauri/parser.js"
import path from "path";
import e from "express"




export const addvideocontroller=catchasyncerror(async(req,res,next)=>{

    const {title,description,tags}=req.body
    console.log(tags)
    

    const image=req.files[`image`][0];
    const video=req.files[`video`][0];

    if(!title ||!description ||!tags ||!image ||!video){
        return next(new Errorhandler("plz enter all fields",400))
    }


    const parser=new DataUriParser();
    const imagedatauri=parser.format(image.mimetype,image.buffer).content;
    const videodatauri=parser.format(video.mimetype,video.buffer).content;

    const imagecloud=await cloudinary.v2.uploader.upload(imagedatauri,{
        resource_type:'image'
    },(error,imagecloud)=>{
        if(error){
            return res.status(500).send("error upload image")
        }
    });


    const videocloud=await cloudinary.v2.uploader.upload(videodatauri,{
        resource_type:'video'
    },(error,videocloud)=>{
        if(error){
            return res.status(500).send("error uplaoding video")
        }
    });


    const newvideo=await videodata.create({
        title,description,tags,
        image:{
            public_id:imagecloud.public_id,
            url:imagecloud.secure_url,
        },
        video:{
            public_id:videocloud.public_id,
            url:videocloud.secure_url,
        }
    });

    res.status(200).json({
        success:true,
        newvideo,
    })

    

});


export const updatevideocontroller=catchasyncerror(async(req,res,next)=>{
    const video=await videodata.findById(req.params.id)
    if(!video){
        return next(new Errorhandler("video not found",400))
    };

    if(req.user.id===video.user){
        const updatevideo=await videodata.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{
            new:true,
            runValidators:true,
        })
    }else{
        return next(new Errorhandler("not authorized to update this video",403))
    };
    res.status(200).json({
        success:true,
        message:"video updated successfully"
    })

});

export const deletevideocontroller=catchasyncerror(async(req,res,next)=>{
    const video=await videodata.findById(req.params.id);
    if(!video){
        return next(new Errorhandler("video not found",400))
    };

    if(req.user.id===video.user){
        await videodata.findByIdAndDelete(req.params.id)
    }else{
        return next(new Errorhandler("not authorized to delete this video",403))
    };
    res.status(200).json({
        success:true,
        message:"video deleted successfully"
    })
});



export const getsinglevideo=catchasyncerror(async(req,res,next)=>{
    const video=await videodata.findById(req.params.id);
    if(!video){
        return next(new Errorhandler("video info not found",400))
    };
    res.status(200).json({
        success:true,
        video,
    })
});


export const addviewcontroller=catchasyncerror(async(req,res,next)=>{
    const video=await videodata.findById(req.params.id);
    if(!video){
        return next(new Errorhandler("video not found",400))
    };
    await videodata.findByIdAndUpdate(req.params.id,{
        $inc:{view:1},
    });
    res.status(200).json({
        success:true,

    })

});



export const randomvideocontroller=catchasyncerror(async(req,res,next)=>{
    const randomvideo=await videodata.aggregate([{$sample:{size:40}}]);

    res.status(200).json({
        success:true,
        randomvideo,
    })
});


export const trendvideocontroller=catchasyncerror(async(req,res,next)=>{
    const trendvideo=await videodata.find().sort({view:-1});

    res.status(200).json({
        success:true,
        trendvideo,
    })
});


export const allsubscribeusercontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id)
    if(!user){
        return next(new Errorhandler("no user found",400))
    };
    const subscribeduser=user.subscribeuser;
    const allsubscribeduser=await Promise.all(
        subscribeduser.map(async(user)=>{
            return await videodata.find({user:user})
        })
    );
    allsubscribeduser.flat().sort((a,b)=>b.createdAt-a.createdAt);
    res.status(200).json({
        success:true,
        allsubscribeduser,
    })

});


export const getbytagcontroller=catchasyncerror(async(req,res,next)=>{
    const tags=req.query.tags.split(",");

    const tagsvideos=await videodata.find({tags:{$in:tags}}).limit(20);

    res.status(200).json({
        success:true,
        tagsvideos,

    })
});


export const searchcontroller=catchasyncerror(async(req,res,next)=>{
    const query=req.query.keyword;

    const allvideo=await videodata.find({
        title:{
            $regex:keyword,
            $options:"i"
        }
    }).limit(40);

    res.status(200).json({
        success:true,
        allvideo
    })
})
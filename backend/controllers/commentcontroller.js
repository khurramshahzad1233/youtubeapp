import catchasyncerror from "../middleware/catchasyncerror.js"
import Errorhandler from "../utils/errorhandler.js"
import commentdata from "../models/comment.js"
import videodata from "../models/videoschema.js"


export const addnewcomment=catchasyncerror(async(req,res,next)=>{
    const newcomment=new commentdata({...req.body,user:req.user.id});

    const comment=await newcomment.save();
    res.status(200).json({
        success:true,
        comment,
    })
});

export const getallcommentofsingelvideo=catchasyncerror(async(req,res,next)=>{
    const allsinglevideocomment=await commentdata.find({video:req.params.videoid});

    res.status(200).json({
        success:true,
        allsinglevideocomment,
    })
});

export const deletesinglecomment=catchasyncerror(async(req,res,next)=>{
    const comment=await commentdata.findById(req.params.id);
    const video=await videodata.findById(req.params.videoid);

    if(req.user.id===comment.user || req.user.id===video.user){
        await commentdata.findByIdAndDelete(req.params.id)
    }else{
        return next(new Errorhandler("you are not authorized to delete this comment",403))
    };
    res.status(200).json({
        success:true,
    })
});
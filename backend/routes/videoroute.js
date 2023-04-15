import express from "express"
import { addvideocontroller } from "../controllers/videocontroller.js";
const router=express.Router();
import upload from "../middleware/multer.js";


router.route("/video/add").post(upload,addvideocontroller)



export default router;
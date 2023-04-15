import express from "express"
import {getallusercontroller,getmyprofilecontroller,logincontroller,registerusercontroller } from "../controllers/usercontroller.js";
import {authuser,authadmin} from "../middleware/auth.js";
import upload from "../middleware/multer.js";
const router=express.Router();

router.route("/user/all").get(getallusercontroller);
router.route("/user/new").post(upload,registerusercontroller);
router.route("/user/login").post(logincontroller)
router.route("/user/me").get(authuser,getmyprofilecontroller)

router.route("/user/profile/me").get(authuser,getmyprofilecontroller)
export default router;
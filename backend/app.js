import express from "express";

import cookieParser from "cookie-parser";

import Errormiddleware from "./middleware/error.js";

import user from "./routes/userroute.js"
import video from "./routes/videoroute.js"



const app=express();



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.use("/api",user)
app.use("/api",video)


app.use(Errormiddleware)
export default app;
import app from "./app.js"
import dotenv from "dotenv"
import cloudinary from 'cloudinary'
if(process.config.env!=="PRODUCTION"){
    dotenv.config({path:"backend/config.env"})
};

import mongoose from "mongoose"
mongoose.set("strictQuery",false);
main().catch(err=>console.log(err));

async function main(){
    await mongoose.connect(process.env.mongodb);
};

cloudinary.v2.config({
    cloud_name:process.env.cloudinary_cloud_name,
    api_key:process.env.cloudinary_api_key,
    api_secret:process.env.cloudinary_api_secret,
})


app.listen(process.env.port,()=>{
    console.log(`server is running on port ${process.env.port}`)
})
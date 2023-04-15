import axios from "axios"

export const newvideoaction=(videodata)=>async(dispatch)=>{
    try {
        dispatch({type:"newvideorequest"});
        const config={
            headers:{
                "content-type":"multipart/form-data"
            }
        };

        const {data}=await axios.post("/api/video/add",videodata,config);

        dispatch({
            type:"newvideosuccess",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"newvideofail",
            paylaod:error.response.data.message
        })
        
    }
}
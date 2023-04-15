import axios from "axios"

export const registeruseraction=(userdata)=>async(dispatch)=>{
    try {
        dispatch({
            type:"REGISTER_USER_REQUEST",
        });
        const config={
            headers:{
                "content-type":"multipart/form-data"
            },
            // withCredentials:true,
        };
        
        const {data}=await axios.post(`/api/user/new`,userdata,config);
        

        dispatch({
            type:"REGISTER_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"REGISTER_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const clearerror=()=>async(dispatch)=>{
    dispatch({
        type:"CLEAR_ERROR"
    })
};


export const loginuseraction=(email,password)=>async(dispatch)=>{
    try {
        dispatch({type:"LOGIN_USER_REQUEST"});

        const config={
            headers:{
                "content-type":"application/json"
            }
        };

        const {data}=await axios.post(`/api/user/login`,{email,password},config)
        dispatch({
            type:"LOGIN_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"LOGIN_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const loaduseraction=()=>async(dispatch)=>{
    try {
        dispatch({
            type:"LOAD_USER_REQUEST"
        });
        const {data}=await axios.get(`/api/user/me`);
        dispatch({
            type:"LOAD_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"LOAD_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }

};


export const logoutuseraction=()=>async(dispatch)=>{
    try {
        dispatch({type:"LOGOUT_USER_REQUEST"});
        const {data}=await axios.get(`/api/user/logout`);

        dispatch({
            type:"LOGOUT_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"LOGOUT_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }
};





export const getalluseraction=()=>async(dispatch)=>{
    try {
        dispatch({type:'alluserrequest'})

        const {data}=await axios.get("/api/user/all")

        dispatch({
            type:"allusersuccess",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"alluserfail",
            payload:error.response.data.message,
        })
        
    }
}


export const getmyprofileaction=()=>async(dispatch)=>{
    try {
        dispatch({type:"myprofilerequest"});

        const {data}=await axios.get("/api/user/profile/me");

        dispatch({
            type:"myprofilesuccess",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"myprofilefail",
            payload:error.response.data.message,
        })
        
    }
}
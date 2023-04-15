import {createReducer,createAction} from "@reduxjs/toolkit";

const userinitialstate={
    user:{}
};


const REGISTER_USER_REQUEST=createAction("REGISTER_USER_REQUEST")
const REGISTER_USER_SUCCESS=createAction("REGISTER_USER_SUCCESS")
const REGISTER_USER_FAIL=createAction("REGISTER_USER_FAIL")
const LOGIN_USER_REQUEST=createAction("LOGIN_USER_REQUEST")
const LOGIN_USER_SUCCESS=createAction("LOGIN_USER_SUCCESS")
const LOGIN_USER_FAIL=createAction("LOGIN_USER_FAIL")
const LOAD_USER_REQUEST=createAction("LOAD_USER_REQUEST")
const LOAD_USER_SUCCESS=createAction("LOAD_USER_SUCCESS")
const LOAD_USER_FAIL=createAction("LOAD_USER_FAIL")
const LOGOUT_USER_REQUEST=createAction("LOGOUT_USER_REQUEST")
const LOGOUT_USER_SUCCESS=createAction("LOGOUT_USER_SUCCESS")
const LOGOUT_USER_FAIL=createAction("LOGOUT_USER_FAIL")

const CLEAR_ERROR=createAction("CLEAR_ERROR")


const clearerror=createAction("clearerror")




const alluserrequest=createAction("alluserrequest")
const allusersuccess=createAction("allusersuccess")
const alluserfail=createAction("alluserfail")


const myprofilerequest=createAction("myprofilerequest")
const myprofilesuccess=createAction("myprofilesuccess")
const myprofilefail=createAction("myprofilefail")


export const userreducer=createReducer(userinitialstate,(builder)=>{
    builder.addCase(REGISTER_USER_REQUEST,(state,action)=>{
        
            state.loading=true
            state.user={}
            state.isAuthenticated=false
        
    })
    builder.addCase(REGISTER_USER_SUCCESS,(state,action)=>{
        
            state.loading=false
            state.user=action.payload.user
            state.isAuthenticated=true
        
    })
    builder.addCase(REGISTER_USER_FAIL,(state,action)=>{
    
            state.loading=false
            state.isAuthenticated=false
            state.user=null
            state.error=action.payload
        
    })
    builder.addCase(CLEAR_ERROR,(state,action)=>{
        
            state.loading=false
            
            state.error=null
        
    })
    builder.addCase(LOGIN_USER_REQUEST,(state,action)=>{
                
            state.loading=true
            state.user={}
            state.isAuthenticated=false
                
    })
    builder.addCase(LOGIN_USER_SUCCESS,(state,action)=>{
               
            state.loading=false
            state.user=action.payload.user
            state.isAuthenticated=true
                
    })
    builder.addCase(LOGIN_USER_FAIL,(state,action)=>{
            state.loading=false
            state.isAuthenticated=false
            state.user={}
            state.error=action.payload
    })
                    
                
            
    builder.addCase(LOAD_USER_REQUEST,(state,action)=>{
                
            state.loading=true
            state.isAuthenticated=false
            state.user={}
                
    })
    builder.addCase(LOAD_USER_SUCCESS,(state,action)=>{
                
            state.loading=false
            state.user=action.payload.user
            state.notification=action.payload.user.notification
            state.seennotification=action.payload.user.seennotification
            state.isAuthenticated=true
       
                
    })
    builder.addCase(LOAD_USER_FAIL,(state,action)=>{
                
            state.loading=false
            state.user={}
            state.isAuthenticated=false
            state.error=action.payload
                
    })
    builder.addCase(LOGOUT_USER_REQUEST,(state,action)=>{
        
            state.loading=true
            state.logout=false

        
    })
    builder.addCase(LOGOUT_USER_SUCCESS,(state,action)=>{
        
            state.loading=false
            state.logout=action.payload.success
            state.user=null
            state.isAuthenticated=false
       
    })
    builder.addCase(LOGOUT_USER_FAIL,(state,action)=>{
        
            state.loading=false
            state.error=action.payload
            
        
    })
})






const alluserinitialstate={
        alluser:[]
};

export const alluserreducer=createReducer(alluserinitialstate,(builder)=>{
        builder.addCase(alluserrequest,(state,action)=>{
                state.loading=true
                state.alluser=[]
        })

        builder.addCase(allusersuccess,(state,action)=>{
                state.loading=false
                state.alluser=action.payload.alluser
        })
        builder.addCase(alluserfail,(state,action)=>{
                state.loading=false
                state.alluser=[]
                state.error=action.payload
        })
        builder.addCase(clearerror,(state,action)=>{
                state.loading=false
                state.error=null
        })
})


const myprofileinitialstate={
        profile:{}
};

export const myprofilereducer=createReducer(myprofileinitialstate,(builder)=>{
        builder.addCase(myprofilerequest,(state,action)=>{
                state.loading=true;
                state.profile={}
        })
        builder.addCase(myprofilesuccess,(state,action)=>{
                state.loading=false;
                state.profile=action.payload.user;
                state.doctor=action.payload.user.doctor;
        })
        builder.addCase(myprofilefail,(state,action)=>{
                state.loading=false;
                state.profile={}
                state.error=action.payload;
        })
        builder.addCase(clearerror,(state,action)=>{
                state.loading=false;
                state.error=null
        })
})
import {createAction,createReducer} from "@reduxjs/toolkit"

const newvideorequest=createAction("newvideorequest");
const newvideosuccess=createAction("newvideosuccess")
const newvideofail=createAction("newvideofail");

const clearerror=createAction("clearerror")


const newvideoinitialstate={
    video:{}
};

export const newvideoreducer=createReducer(newvideoinitialstate,(builder)=>{
    builder.addCase(newvideorequest,(state,action)=>{
        state.loading=true;
        state.video={}
    })
    builder.addCase(newvideosuccess,(state,action)=>{
        state.loading=false;
        state.video=action.payload.newvideo;

    })
    builder.addCase(newvideofail,(state,action)=>{
        state.loading=false;
        state.video={}
        state.error=action.payload;
    })
    builder.addCase(clearerror,(state,action)=>{
        state.loading=false;
        state.error=null
    })
})
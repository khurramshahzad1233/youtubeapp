import {configureStore} from "@reduxjs/toolkit"
import { alluserreducer, myprofilereducer, userreducer } from "./components/reducer/userreducer";
import { newvideoreducer } from "./components/reducer/videoreducer";

const store=configureStore({
    reducer:{
        userred:userreducer,
        alluserred:alluserreducer,
        myprofilered:myprofilereducer,
        newvideored:newvideoreducer,
    }
});

export default store;
import React,{useEffect} from 'react';
import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import WebFont from 'webfontloader'
import Home from './components/home/Home';
import Loginsignup from './components/loginsignup/Loginsignup';
import {loaduseraction} from "./components/actions/useraction"
import {useDispatch} from "react-redux"
import Newvideo from './components/videos/Newvideo';

const App = () => {

  const dispatch=useDispatch()

  useEffect(()=>{

    WebFont.load({google:{
      families:["Roboto","Montserrat","Droid Sans","Chilanka","Satisfy"]
    }});

    dispatch(loaduseraction())
  },[dispatch])
  return (

    <Router>

      <Routes>



        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Loginsignup/>}/>
        <Route path='/video/new' element={<Newvideo/>}/>

      </Routes>

    </Router>
  )
}

export default App
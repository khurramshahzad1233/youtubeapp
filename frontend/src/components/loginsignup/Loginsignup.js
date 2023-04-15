import React,{Fragment,useRef,useState,useEffect} from 'react'
import "./Loginsignup.css"


import {FiMail} from "react-icons/fi"
import {FaLock} from "react-icons/fa"
import {RxFace} from "react-icons/rx"
import {BiLockOpen} from "react-icons/bi"
import {registeruseraction,loginuseraction,clearerror} from "../actions/useraction"
import {useDispatch,useSelector} from "react-redux";
import {useAlert} from "react-alert"
import {useLocation, useNavigate} from "react-router-dom"



const Loginsignup = () => {
    const switchertab=useRef(null);
    const logintab=useRef(null)
    const registertab=useRef(null);

    const dispatch=useDispatch()
    const alert=useAlert()
    const navigate=useNavigate();
    const location=useLocation();

    const [loginemail,setLoginemail]=useState("");
    const [loginpassword,setLoginpassword]=useState("");

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const [avatar,setAvatar]=useState("");
    const [avatarpreview,setAvatarpreview]=useState("/profile.png")

    const {error,isAuthenticated}=useSelector((state)=>state.userred)

    const switchtab=(tab)=>{
        if(tab==="login"){
            switchertab.current.classList.remove("shifttoright")
            switchertab.current.classList.add("shifttoneutral")

            registertab.current.classList.remove("neutralform")
            logintab.current.classList.remove("shifttoleft")
            
        };
        if(tab==="register"){
            switchertab.current.classList.remove("shifttoneutral")
            switchertab.current.classList.add("shifttoright")

            registertab.current.classList.add("neutralform")
            logintab.current.classList.add("shifttoleft")


        };
    }

    const loginsubmithandler=(e)=>{
        e.preventDefault();
        dispatch(loginuseraction(loginemail,loginpassword))
        
    };

    const registersubmithandler=(e)=>{
        e.preventDefault();
        const myform=new FormData();

        myform.set("name",name)
        myform.set("email",email)
        myform.set("password",password)
        myform.set("image",avatar)

        dispatch(registeruseraction(myform))
    }

    const registerhandler=(e)=>{
        const file=e.target.files[0];
        const reader=new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend=()=>{
            setAvatarpreview(reader.result)
            setAvatar(file);
        }
    }

    const redirect=location.search?location.search.split("=")[1]:"/account"

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror())
        }

        if(isAuthenticated){
            navigate(redirect)
        }
    },[alert,dispatch,error,isAuthenticated,redirect,navigate])
  return (
    <Fragment>
        {/* <Metadata title={`login/signUp`}/> */}
        <div className="loginsignupcontainer">
            <div className="loginsignupbox">
                <div className="loginsignuptoggle">
                    <p onClick={(e)=>switchtab("login")}>Login</p>
                    <p onClick={(e)=>switchtab("register")}>Register</p>
                </div>
                <div><button className='togglebtn' ref={switchertab}></button></div>

                <form
                ref={logintab}
                onSubmit={loginsubmithandler}
                className="loginform"
                >
                    <div>
                        <FiMail/>
                        <input type="email" 
                        required
                        placeholder='plz enter your email address'
                        value={loginemail}
                        onChange={(e)=>setLoginemail(e.target.value)}
                        />

                    </div>
                    <div>
                        <FaLock/>
                        <input type="password"
                        required
                        placeholder='plz enter your password'
                        value={loginpassword}
                        onChange={(e)=>setLoginpassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input type="submit"
                        value="Login"
                        />
                    </div>
                </form>

                <form
                ref={registertab}
                encType="multipart/form-data"
                onSubmit={registersubmithandler}
                className="registerform"
                >
                    <div>
                        <RxFace/>
                        <input type="text"
                        required
                        placeholder='plz enter your name'
                        value={name}
                        name="name"
                        onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <FiMail/>
                        <input type="email"
                        required
                        placeholder='plz enter your email address'
                        value={email}
                        name="email"
                        onChange={(e)=>setEmail(e.target.value)}
                         />
                    </div>
                    <div>
                        <BiLockOpen/>
                        <input type="password"
                        required
                        placeholder='plz enter your password'
                        value={password}
                        name="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <img src={avatarpreview} alt="avatar preview" width="30px"/>

                        <input type="file"
                        required
                        accept='image/*'
                        name="avatar"
                        onChange={registerhandler}
                        />
                    </div>
                    <div>
                        <input type="submit"
                        value="Register"
                        />
                    </div>
                </form>
            </div>
        </div>
    </Fragment>
    
  )
}

export default Loginsignup
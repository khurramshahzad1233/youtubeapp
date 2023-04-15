import React,{Fragment,useState} from 'react'
import Header from '../layout/Header'
import {AiFillYoutube} from "react-icons/ai"
import {FiLogIn} from "react-icons/fi"
import "./Home.css"

const Home = () => {

    const [darkmode,setDarkmode]=useState(true);
    const [searchbar,setSearchbar]=useState("")

    const searchhandler=(e)=>{}

    const themehandler=(e)=>{
        setDarkmode(!darkmode)
    }
  return (
    <Fragment>
        <div>
            <div className="navigationbar">
                <div className="logo"><AiFillYoutube/><span>YouTube</span></div>
                <div className="searchbar">
                    <input type="text"
                    required
                    placeholder='search'
                    value={searchbar}
                    onChange={(e)=>searchhandler()}
                    />
                </div>
                <div className="signup">
                    <FiLogIn/>
                    <span>SIGN IN</span>
                </div>
            </div>
        <Header themehandler={themehandler} darkmode={darkmode}/>
        </div>
        
    </Fragment>
  )
}

export default Home
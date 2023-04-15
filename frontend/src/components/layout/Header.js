import React,{Fragment} from 'react';
import "./Header.css"
import {AiFillHome,AiFillEye,AiOutlineHistory,AiOutlineSetting} from "react-icons/ai"
import {BsCollectionPlay,BsMusicNoteBeamed} from "react-icons/bs"
import {MdOutlineSportsVolleyball,MdModeNight} from "react-icons/md"
import {SiPcgamingwiki} from "react-icons/si"
import {MdLocalMovies,MdOutlineReportGmailerrorred,MdHelpOutline} from "react-icons/md"
import {BiNews} from "react-icons/bi"
import {RiLiveFill} from "react-icons/ri"
import {} from "react-icons"
import {} from "react-icons"
import {HiLibrary} from "react-icons/hi"

const Header = ({themehandler,darkmode}) => {
  return (
    <Fragment>
        <div className={darkmode?"sidebar":"sidebar darkmodediv"}>
            <p><span><AiFillHome/></span><span>Home</span></p>
            <p><span><AiFillEye/></span><span>Explore</span></p>
            <p><span><BsCollectionPlay/></span><span>Subscription</span></p>
            <p><span><HiLibrary/></span><span>Library</span></p>
            <p><span><AiOutlineHistory/></span><span>History</span></p>
            <p><span><BsMusicNoteBeamed/></span><span>Music</span></p>
            <p><span><MdOutlineSportsVolleyball/></span><span>Sports</span></p>
            <p><span><SiPcgamingwiki/></span><span>Gaming</span></p>
            <p><span><MdLocalMovies/></span><span>Movies</span></p>
            <p><span><BiNews/></span><span>News</span></p>
            <p><span><RiLiveFill/></span><span>Live</span></p>
            <p><span><AiOutlineSetting/></span><span>Settings</span></p>
            <p><span><MdOutlineReportGmailerrorred/></span><span>Reports</span></p>
            <p><span><MdHelpOutline/></span><span>Help</span></p>
            <p 
            onClick={(e)=>themehandler(e)}
            ><span><MdModeNight/></span><span>Dark Mode</span></p>
           
        </div>
    </Fragment>
  )
}

export default Header
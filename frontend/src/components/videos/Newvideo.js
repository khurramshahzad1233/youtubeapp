import React,{Fragment,useState} from 'react';
import "./Newvideo.css"
import {newvideoaction} from "../actions/videoaction"
import {useDispatch} from "react-redux"

const Newvideo = () => {

    const dispatch=useDispatch();


    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [image,setImage]=useState("");
    const [imagepreview,setImagepreview]=useState("")
    const [video,setVideo]=useState("")
    const [videopreview,setVideopreview]=useState("")
    const [tags,setTags]=useState("")

    const imagehandler=(e)=>{
        const file=e.target.files[0];
        const reader=new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setImagepreview(reader.result);
            setImage(file)
        }
    };

    const videohandler=(e)=>{
        const file=e.target.files[0];
        const reader=new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend=()=>{
            setVideopreview(reader.result);
            setVideo(file)

        }
    }

console.log(tags)

    const newvideosubmithandler=(e)=>{
        e.preventDefault();

        const myform=new FormData();
        myform.set("title",title)
        myform.set("description",description)
        myform.set("image",image)
        myform.set("video",video);

        const alltag=tags.split(",").map((tg)=>(tg))
        alltag.forEach((tag)=>{
            myform.append("tags",tag)
        })
        

        dispatch(newvideoaction(myform))
    }

  return (
    <Fragment>
        <div className="newvideopage">
            <form
            encType='multipart/form-data'
            onSubmit={newvideosubmithandler}
            >
                
                <p>
                    <input type="text"
                    required
                    placeholder='title'
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    />
                </p>

                <p>
                    <input type="text"
                    required
                    placeholder='description'
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}

                    />
                </p>
                <p>
                    <input type="text"
                    required
                    placeholder='tags'
                    value={tags}
                    onChange={(e)=>setTags(e.target.value)}
                    />
                </p>
                <p>
                    <input type="file"
                    accept='image/*'
                    required
                    name="image"
                    onChange={imagehandler}
                    />
                </p>

                <p>
                    <input type="file"
                    required
                    accept='video/mp4'
                    onChange={videohandler}
                    />
                </p>
                <p>
                    <input type="submit"
                    value="add new video"
                    />
                </p>
            </form>
        </div>
    </Fragment>
  )
}

export default Newvideo
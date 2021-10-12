import React from 'react'
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import CloseIcon from '@mui/icons-material/Close';
import './css/fullpost.css'
import { Avatar } from '@mui/material';


export const Fullpost = ({postimg , onclick}) => {

    function comments(){
        return(
            <div className="scomment">
                <div>
                <Avatar id='sca'/>
                <h5>nammmmmmmmmmm</h5>
                </div>

                <div className="cm">
                <p>: thehjhfdjhfjkhdkhkjhkjfhdkjlgh kjfhgkjhfkjghdfjjjjjjjjjjjjjjhgkjdhfghdfkgkljdfhgkjhhfh</p>
                </div>
            </div> 
        );
    }


    return (<>
        <div className="fpcontainer" onClick={onclick}>
        click to close
        </div>

            <CloseIcon id="close" onClick={onclick}/>
        <div className="fullpost">
            <div className="currentpost">
                <img src={postimg} alt="" />
            </div>
            <div className="sidecomments">
            <div className="fpc">
                {comments()}
                {comments()}
           </div>
           <h5 style={{margin:"7px 23px 0 23px ",fontWeight:"300" , color:"gray"}}>timestamp</h5>          
          
           <div className="comment"  style={{border: "black solid"}}>
               <SentimentSatisfiedOutlinedIcon/>
               <textarea placeholder="Comment" type="text" />
               <button type="submit">Post</button>

           
            </div>
            
        </div>
        </div>
        </>
    )
}

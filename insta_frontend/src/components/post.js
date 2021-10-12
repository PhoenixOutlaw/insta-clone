import { Avatar } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import React, { useState } from 'react'
import './css/post.css'
import { Fullpost } from './Fullpost';


export const Post = ({postimg , user ,postvideo , embd}) => {
    const [fpost, setfpost] = useState(false);

   function comments(){
       return(
           <div className="pinnedcomments">
               <h5>nammmmmmme</h5>
               
               <p>: thehj hfdjhfjk hdkhkjhkjfhdkjlgh kjfhgkjhfkjghdfhgkjdhfghdfkgkljdfhgkjhhf h</p>
           </div> 
       );
   }

    const [like, setlike] = useState(false);
    const [likecount, setlikecount] = useState(0);

    const count = ()=>{
        var a = likecount;
        if(!like ){
         a+=1;
         setlikecount(a);} 
        else
        {
            a-=1;
         setlikecount(a);
        }
        
    }
    return (
        <div className="postcontainer">
           <div className="postheader">

              <div className="headleft">
               <Avatar id ='pava'/>
               <h4>{user}</h4>
              </div>

               <MoreHorizIcon/>
           </div>
           <div className="postimg">
               {postimg &&<img src={postimg} alt="" />}
               {postvideo && <video controls className="postvideo">
                   <source  src={process.env.PUBLIC_URL+"sss.mp4"}/>
                   </video>}
           </div>
           <div className="postopt">
               <div className="leftpopt">
                   {like && <FavoriteIcon onClick={()=> {setlike(!like); count()}} id='like'/>}
                   {like===false && <FavoriteBorderOutlinedIcon onClick={()=> {setlike(!like); count();}}/>}
                   <ChatBubbleOutlineOutlinedIcon/>
                   <SendOutlinedIcon/>
               </div>
               <div className="rightpopt">
                   <BookmarkBorderOutlinedIcon/>
               </div>
               </div>    
               <h4>{likecount} likes</h4>
          
          
           <div className="comments">
               <h5 onClick={()=>setfpost(true)}>View all 2132 comments </h5>
                {comments()}
                {comments()}
           </div>
           <h5 style={{margin:"7px 23px 0 23px ",fontWeight:"300" , color:"gray"}}>timestamp</h5>          
          
           <div className="comment">
               <SentimentSatisfiedOutlinedIcon/>
               <textarea placeholder="Comment" type="text" />
               <button type="submit">Post</button>

           </div>

           {fpost&&<Fullpost postimg={postimg} onclick={()=>setfpost(false)}/>}
        </div>
    )
}

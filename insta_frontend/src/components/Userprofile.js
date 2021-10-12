import { SettingsTwoTone } from "@mui/icons-material";
import { Avatar} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import "./css/userprofile.css";
import  { selectlogin } from '../features/loginSlice';
import { Highlights } from "./Highlights";
import GridOnSharpIcon from '@mui/icons-material/GridOnSharp';
import SubscriptionsSharpIcon from '@mui/icons-material/SubscriptionsSharp';
import LiveTvRoundedIcon      from '@mui/icons-material/LiveTvRounded';
import BookmarkRoundedIcon    from '@mui/icons-material/BookmarkRounded';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { useHistory } from "react-router";
import axios from "./axios";
import { useParams } from "react-router";

export const Userprofile = () => {
  const [accinfo, setaccinfo] = useState()
  const [finfo, setfinfo] = useState()
  const [fo, setfo] = useState()
  const {usern}=useParams();
  // const usern =window.location.search.get(user);
  
  function follow(){
    axios.post('/follow',{username:usern,useremail:user.email}).then((res)=>console.log(res))
  }

  function Hopt({Icon , title}){
    return(
      <div className="hopt">
        <Icon/>
        <h4>{title}</h4>
        </div>
    )
  }
  const user = useSelector(selectlogin);
  const history = useHistory();
  const testimg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI3dV7gxPHvvw2h0ktazzZF2rc5lI5Xxi1xg&usqp=CAU"
  

  useEffect(() => {
    if(usern===undefined) {
      axios.post('/account/user',{useremail:user.email}).then( async(req) => {
         const data =  req.data;
         setaccinfo(await data[0]);
        })
        
      axios.post('/finfo',{useremail:user.email,type:"count"}).then( async(req) => {
         const data =  req.data;

         setfinfo(await data);
        })

        }
     else{
      axios.post('/account/info',{username:usern}).then( async(req) => {
         const data =  req.data;
         setaccinfo(await data);
        })
      axios.post('/finfo',{username:usern,type:"count"}).then( async(req) => {
         const data =  req.data;
         setfinfo(await data);
        })
        
        axios.post('/followed',{username:usern,useremail:user.email}).then( async(req) => {
          const data =  req.data;
          setfo(await data);
        })

        }     
   }, [usern]);

   

  return (
    <div className="profilecontainer">
      <div className="profileinfo">
        <div className="infoheader">
          <div className="infoh">
            
              <Avatar id="pa" src={accinfo?.dp}/>
              <div className="userp">
                  <div className="p1">
                    <h5>{accinfo?.username}</h5>
                    {(accinfo?.useremail!==user.email)?( 

                    (fo==="not followed")?(<button onClick={()=> follow()}>Follow</button>):(<button >Following</button>)

                    ):(<button onClick={()=> history.push('/account/edit')}>Edit profile</button>)}
                   
                    
                    <SettingsTwoTone/>
                  </div>
                  {(accinfo?.useremail!==user.email)?((fo==="not followed")?(<button id="btnext" onClick={()=> follow()}>Follow</button>):(<button id="btnext" >Following</button>)):( <button id="btnext" onClick={()=> history.push('/account/edit')}>Edit profile</button>)}
                 
                  
                  <div className="profilecontent">
                      <h3> {accinfo?.posts} posts</h3>
                      <h3> {finfo?.follower} Follower</h3>
                      <h3> {finfo?.following} Following</h3>
                  </div>
        
                 <div className="bio">
                 <h4>{accinfo?.name}</h4>
                     <p>{accinfo?.bio}</p>
                 </div>
 
        
            </div>
          </div>
        <div className="highlights">
            <Highlights img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI3dV7gxPHvvw2h0ktazzZF2rc5lI5Xxi1xg&usqp=CAU"/>
        </div>
      </div>
      <div className="profilemedia">
        <div className="pmopt">
          <div>
                       
            <Hopt Icon={GridOnSharpIcon} title="Posts"/>
            <Hopt Icon={SubscriptionsSharpIcon} title="Reels"/>
            <Hopt Icon={LiveTvRoundedIcon} title="IGTv"/>
            <Hopt Icon={BookmarkRoundedIcon} title="Saved"/>
            <Hopt Icon={AccountBoxOutlinedIcon} title="Tagged"/>
          </div>
        </div>
        <div className="userspost">
         <img src={testimg} alt="" />
         <img src={testimg} alt="" />
         <img src={testimg} alt="" />
         <img src={testimg} alt="" />
         <img src={testimg} alt="" />
         <img src={testimg} alt="" />
        </div>

      </div>
        </div>
    </div>

  );
};

import React, { useState } from 'react'
import { Avatar } from '@mui/material';
import './css/search.css'
import { useHistory } from 'react-router';
import axios from './axios';

export const Search = ({username}) => {
    const [user, setuser] = useState()
    const history = useHistory()
    axios.post('/account/info',{username:username}).then( async(req) => {
        const data =  req.data;
        setuser(await data);
       })
    return (
        <div  className="usersearch" onClick={()=>history.push(`/profile/${username}`)}>
            <Avatar id="scha" src={user?.dp}/>
            <h6>{user?.username}</h6>
        </div>
    )
}

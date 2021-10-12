import { Avatar } from '@mui/material'
import React from 'react'
import './css/highlight.css'
export const Highlights = ({img,title}) => {
    return (
        <div className="highlight">
        {img && <Avatar id='hava' src={img}/>}
       {title && <h5>{title}</h5>}
        
    </div>
    )
}

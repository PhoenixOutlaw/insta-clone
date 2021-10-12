import { Avatar } from '@mui/material'
import React from 'react'
import './css/stories.css'

export const Stories = ({img , title}) => {
    return (
        <div className="story">
            {img && <Avatar id='sava' src={img}/>}
           {title && <h5>{title}</h5>}
            
        </div>
    )
}

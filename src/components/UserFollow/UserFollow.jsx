import React, { useState } from 'react';
import "./UserFollow.scss";
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from "react-router-dom";

function UserFollow({ data, handleUnfollow }) {
    const { name, display_name, id, favourites_id } = data;
    const navigate = useNavigate();

    const handleClick = () => {
        handleUnfollow(id);
    }

    const handleNavigation = () => {
        navigate(`/cliques/${id}`)
    }
    return (
        // <div className='userFollow'>
        //     <Link to={`/cliques/${id}`} className='userFollow__link'>
        //         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='userFollow__text'>
        //             {name} 
        //         </Typography>
        //     </Link>
        //     <Chip label="Unfollow" variant="outlined" onClick={handleClick} />
            
        // </div>    
        
        <div className='userFollow'>
            <h5 className="userFollow__text" onClick={handleNavigation}>{ name }</h5>
            <h5 className='userFollow__follow' onClick={handleClick}>Unfollow</h5>    
        </div> 
    );
}

export default UserFollow;

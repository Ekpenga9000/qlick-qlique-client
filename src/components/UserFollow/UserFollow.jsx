import React, { useState } from 'react';
import "./UserFollow.scss";
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

function UserFollow({ data, handleUnfollow }) {
    const { name, display_name, id, favourites_id } = data;
    

    const handleClick = () => {
        handleUnfollow(id);
    }

    return (
        <div className='userFollow'>
            <Link to={`/cliques/${id}`} className='userFollow__link'>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='userFollow__text'>
                    You're following {name} 
                </Typography>
            </Link>
                <Chip label="Unfollow" variant="outlined" onClick={handleClick} />
        </div>    
    );
}

export default UserFollow;

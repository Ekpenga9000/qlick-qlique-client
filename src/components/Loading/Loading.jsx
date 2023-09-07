import React from 'react';
import "./Loading.scss";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Loading() {
  return (
    <Box sx={{ display: 'flex' }} color={"inherit"} className="loading">
        <CircularProgress />
  </Box>
  )
}

export default Loading
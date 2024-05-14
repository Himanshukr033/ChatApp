import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Typography } from '@mui/material';

export default function ChatLoading() {
  return (
    <div style={{ width: 300 }}>
      <Typography variant="h2"> <Skeleton animation="wave" /> </Typography>
      <Typography variant="h2"> <Skeleton animation="wave" /> </Typography>
      <Typography variant="h2"> <Skeleton animation="wave" /> </Typography>
      <Typography variant="h2"> <Skeleton animation="wave" /> </Typography>
      <Typography variant="h2"> <Skeleton animation="wave" /> </Typography>
      <Typography variant="h2"> <Skeleton animation="wave" /> </Typography>
      <Typography variant="h2"> <Skeleton animation="wave" /> </Typography>
      <Typography variant="h2"> <Skeleton animation="wave" /> </Typography>
      <Typography variant="h2"> <Skeleton animation="wave" /> </Typography>

      
    </div>
  );
}
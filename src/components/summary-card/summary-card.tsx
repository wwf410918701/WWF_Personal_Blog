import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Card from "@mui/material/Card/Card";
import EuroIcon from '@mui/icons-material/Euro';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";

import DefaultBlogPoster from '../../data/images/default-blog-poster.png';
import { convertToDate } from "../../utils/utils";

interface SummaryCardProps {
  // imageUrl: string;
  id: number;
  title: string;
  summary: string;
  time: {
     seconds: number,
     nanoseconds: number};
  author: string;
  posterUrl: string;
}

export const SummaryCard = ({ id, title, summary, time, author, posterUrl }: SummaryCardProps) => {
  const navigate = useNavigate();
  // const createTime = new Date(time.seconds * 1000 + time.nanoseconds)
  const createTime = convertToDate(time)

  return (
    <Card sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'}} onClick={() => navigate(`/blogs/blogPage/${id}`)}>
      <Stack direction='row' spacing={2} alignItems='center'  sx={{width: '100%'}}>
        <img src={posterUrl?? DefaultBlogPoster} alt={title} style={{width: '280px', height: '280px', padding: "10px", cursor: 'pointer'}} onClick={() => {navigate('/ticketDetail/123')}} />
        <Stack direction='column' justifyContent='space-between' spacing={2} sx={{padding: '20px', marginLeft: '30px', width: '100%', height: '280px' }}>
          <Stack spacing={1}>
            <Typography variant="h4">
              {title}
            </Typography>
            <Typography variant='body1' color="text.first" className="paragraph" sx={{maxWidth: '600px', textOverflow: 'ellipsis', overflow: 'hidden'}} >
              {summary} 
            </Typography>
          </Stack>
          <Stack sx={{width: '100%'}} direction='row-reverse' spacing={3}>
            <Typography>
              Create At: 
              <span style={{color: '#2196f3', marginLeft: '8px', marginRight: '8px'}}>{`${createTime.getFullYear()}/${createTime.getMonth()}/${createTime.getDay()} - ${createTime.getHours()}:${createTime.getMinutes()}`}</span>
            </Typography>
            <Typography>
              {`Author: ${author}`}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
)}
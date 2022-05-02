import IconButton from "@mui/material/IconButton/IconButton";
import React from "react";
import { Routes, useNavigate, } from "react-router-dom";

import CreateIcon from '@mui/icons-material/Create';
import RssFeedIcon from '@mui/icons-material/RssFeed'; 
import AllInboxIcon from '@mui/icons-material/AllInbox';

import {  HeaderNavBar } from "../../components/header-nav-bar/header-nav-bar";
import { blogs_router } from "../../router/blogs-routers";
import Box from "@mui/material/Box/Box";
import Stack from "@mui/material/Stack/Stack";


export const BlogsContainer = ({ match }: any) => {
  const navigate = useNavigate();

  const blogHeaderItems = [
    {title: 'All Posts', navigation: () => navigate('/blogs/'), icon: <RssFeedIcon/>},
    {title: 'Write A Post', navigation: () => navigate('/blogs/createnewblog'), icon: <CreateIcon/>},
    {title: 'My Posts', navigation: () => navigate('/blogs/myblogs'), icon: <AllInboxIcon/>}
  ];

  return (
    <>
      <HeaderNavBar>
        <Stack direction='row' spacing={5}>
          {blogHeaderItems.map(blogHeaderItem => (
            <IconButton key={blogHeaderItem.title} onClick={() => blogHeaderItem.navigation()} size='small'>
              <Box sx={{marginRight: '8px'}}>
                {blogHeaderItem.icon}
              </Box>
              {blogHeaderItem.title}
            </IconButton>
          ))}
        </Stack>
      </HeaderNavBar>
      <Routes>
        {Object.keys(blogs_router).map(broute => blogs_router[broute])}
      </Routes>
    </>
  )
}
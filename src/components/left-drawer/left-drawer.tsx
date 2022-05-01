import React, { useContext, useEffect, useRef } from "react";
import { RootStoreContext } from "../../App";
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom";
import { action } from "mobx";

import RssFeedIcon from '@mui/icons-material/RssFeed'; 
import Drawer from "@mui/material/Drawer/Drawer";
import { Box, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

import OpenForHirePic from '../../data/images/openForHirePic.png';
import { auth, fetchUserName, storeUser } from "../../firebase/firebase-utils";

export const LeftDrawer = observer(() => {
  const { globalUiStore } = useContext(RootStoreContext)
  let unsubscribeFromAuth = useRef<any>()
  const navigate = useNavigate()

  const { userStore } = useContext(RootStoreContext)

  useEffect(action(() => {
    unsubscribeFromAuth.current = auth.onAuthStateChanged(user => {
      if (user) {
        fetchUserName(user.uid)
        .then(userName => {
          userStore.userLogin(user.uid, userName as string, user.email as string)
          storeUser(user.uid, user.displayName, user.email, new Date())
        })
      }
    })

    //unsubscribe the auth, clean memory
    return () => {
      unsubscribeFromAuth.current()
    }
  }))

  const drawerItems = [{
    icon: <RssFeedIcon />,
    title: 'Blogs',
    navigation: () => { navigate('/blogs') }
  },
  {icon: <PersonIcon />,
   title: 'About Me',
   navigation: () => { navigate('/') }
  }]

  return (
    <Drawer anchor='left' open={ globalUiStore.openDrawer } onClose={action(() => globalUiStore.openDrawer = false)}>
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', cursor: 'pointer'}} onClick={() => navigate('/')}>
        <Box sx={{border: '1px dotted', borderColor: '#9e9e9e', margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '20px'}}>
          <img src={OpenForHirePic} alt="" style={{width: '100px', height: '100px'}}/>
          <Typography sx={{width: '250px', padding: '10px', paddingTop: '0px',textAlign: 'center'}}>
            Hi, I am now finding intern opportunity as frontend developer! 
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{width: '250px', padding: '10px', paddingTop: '0px',textAlign: 'center'}}>
            Check my resume or contact me in the About Me page.
          </Typography>
        </Box>
      </Box>
      {drawerItems.map(drawItem => (
        <ListItem button key={drawItem.title} onClick={() => drawItem.navigation()}>
          <ListItemIcon>
            {drawItem.icon}
          </ListItemIcon>
          <ListItemText primary={drawItem.title} />
        </ListItem>
      ))} 
    </Drawer>
  )
})
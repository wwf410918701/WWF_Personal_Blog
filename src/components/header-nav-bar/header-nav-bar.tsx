import React, { useContext } from "react";
import { action } from "mobx";
import { useNavigate } from "react-router-dom";

import { AppBar, Toolbar, IconButton, Button, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"
import { RootStoreContext } from "../../App";
import { Box } from "@mui/system";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { observer } from "mobx-react-lite";
import { auth } from "../../firebase/firebase-utils";

export type HeaderItem = {title: string, navigation: () => void}
// interface HeaderNavBarProps {
//   headerItems: HeaderItem[],
// }

interface HeaderNavBarProps {
  children: JSX.Element[] | JSX.Element;
}

export const HeaderNavBar = observer(({ children }: HeaderNavBarProps) => {
  const { userStore, globalUiStore } = useContext(RootStoreContext)
  const navigate = useNavigate()

  // return(
  //   <AppBar position="static">
  //     <Toolbar>
  //       <IconButton edge='start' onClick={action(() => globalUiStore.openDrawer = true)}>
  //         <MenuIcon />
  //       </IconButton>
  //       <Box sx={{ marginLeft: '50px' }}>
  //         {headerItems.map(headerItem => (
  //           <IconButton key={headerItem.title} onClick={() => headerItem.navigation()}>
  //             {headerItem.title}
  //           </IconButton>
  //         ))}
  //       </Box>
  //     </Toolbar>
  //   </AppBar>)

  return(
    <AppBar position="static" sx={{ opacity: '90%', ":hover": { opacity:'80%'} }}>
      <Toolbar sx={{ alignItems: 'center' }}>
        {/* <Box> */}
          <IconButton edge='start' onClick={action(() => globalUiStore.openDrawer = true)}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ marginLeft: '50px', width: '100%' }}>
            {children}
          </Box>
          <Box sx={{width: '100%', display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
            {userStore.userID?
              (<Tooltip title={
                <Box onClick={() => {
                    auth.signOut()
                      .then(() => {
                        userStore.userLogout()}
                      )
                  }} 
                  sx={{cursor: 'pointer'}}
                >
                  Sign Out
                </Box>}
              >
              <AccountCircleIcon />
            </Tooltip>)
            :
            (<>
              <Button sx={{color: '#fff'}} onClick={() => navigate('/signin')}>
              sign in
              </Button>
              /
              <Button onClick={() => navigate('/signup')}>
                sign up
              </Button>
            </>) }
          </Box>
      </Toolbar>
    </AppBar>)
})
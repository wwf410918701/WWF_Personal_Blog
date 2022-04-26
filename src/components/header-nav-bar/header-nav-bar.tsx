import React from "react";

import { AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"

interface HeaderNavBarProps {
  headerItems: string[],
}

export const HeaderNavBar = ({ headerItems }: HeaderNavBarProps) => {
  return(
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton edge='start'>
          <MenuIcon />
        </IconButton> */}
        {headerItems.map(headerItem => (
          <IconButton key={headerItem}>
            {headerItem}
          </IconButton>
        ))}
      </Toolbar>
    </AppBar>)
}
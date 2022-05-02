import React, { useState } from "react";

import SwipeableViews from 'react-swipeable-views';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { autoPlay } from 'react-swipeable-views-utils';
import Box from "@mui/material/Box/Box";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

interface AutoSlideWrapperProps {
  children: JSX.Element[]
}

//TODO slide滑动可以循环
export const AutoSlideWrapper = ({ children }: AutoSlideWrapperProps) => {
  const [index, setIndex] = useState(0);

  const choosePreAd = () => {
    if(index === 0) {
      // setIndex(children.length-1)
      return;
    }
    setIndex(index - 1);
  }

  const chooseNextAd = () => {
    if (index === (children.length-1)) {
      // setIndex(0)
      return;
    }
    setIndex(index + 1);
  }

  return(
    <Box sx={{display: 'flex', flexDirection: 'row', position: 'relative', alignItems: 'center', justifyContent: 'center', margin: '20px', marginTop: '50px' }}>
      <IconButton 
        onClick={choosePreAd}
        sx={{'left': '5%', 'zIndex': '999'}}
      >
        <ChevronLeftIcon />
      </IconButton>
      <AutoPlaySwipeableViews index={index} 
      onChangeIndex={function (index: number): void {
        setIndex(index);
      }}
      >
        {children}
      </AutoPlaySwipeableViews>
      <IconButton sx={{right: '5%', 'zIndex': '999'}}
        onClick={chooseNextAd}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  )
}
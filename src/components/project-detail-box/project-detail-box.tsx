import React from "react";

import { Grid, Typography, Box } from '@mui/material';
import Item from '@mui/material/ListItem/ListItem';

import EcommercePic from '../../data/images/ecommerce-screenshot.png';
import CommingSoonPic from '../../data/images/Comming-soon.jpg';
import './project-detail-box-styles.scss'

export const ProjectDetailBox = () => {
  const EcommerceDesParagraph = 'An online shop which contains most frequently-used features like login, items display, shopping cart, payment.'
  const projectPreviewPics = [{img: EcommercePic, url: 'https://weifeng-shop.herokuapp.com/', des: ["WWF's Shop", 'ECommerce website', EcommerceDesParagraph]}, 
    {img: CommingSoonPic, url: null, des: []}]

  return (<Grid container spacing={1} sx={{ justifyContent: 'center'}} id='myProject'>
    {projectPreviewPics.map((projectPreviewPic, index) => (
      <>
        <Grid item xs={5} key={'project_pre_pic_'+index} className={projectPreviewPic.url? 'projectPreviewBox' : undefined}>
          <Item onClick={() => {
            if(projectPreviewPic.url) {
              window.open(projectPreviewPic.url)
            }
          }}>
            <img src={projectPreviewPic.img} style={{width: '100%', height: '310px'}}></img>
          </Item>
        </Grid>
        <Box key={'project_pre_desc_'+index} className='projectPreviewdes'>
          <Box sx={{width: '100%', textAlign: 'center'}}>
            <Typography variant="h6" className="paragraph" color='#4caf50'> 
              {projectPreviewPic.des[0]}
            </Typography>
            <Typography variant="h5" sx={{marginBottom: '8px'}}>{projectPreviewPic.des[1]}</Typography>
            <Typography variant="h6" className="paragraph"> 
              {projectPreviewPic.des[2]}
            </Typography>
          </Box>
        </Box>
      </>
    ))}
   </Grid>
)}
import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Typography from "@mui/material/Typography";

import './workmate-feedback-box-styles.scss'

interface WorkMateFeedbackBoxProps {
  feedBacks: {paragraph: string, name: string, position: string}[]
}

export const WorkMateFeedbackBox = ({ feedBacks }: WorkMateFeedbackBoxProps) => (
  <Grid container spacing={2} sx={{justifyContent: 'center', marginBottom: '16px'}}>
    <Grid item key={'skillsetbox_1'} xs={3} >
      <Paper elevation={6} sx={{display: 'flex', flexDirection: 'column', padding: '20px', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
        <Typography className="feedback-box-paragraph">
          {feedBacks[0].paragraph}
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
          <Box sx={{display: 'flex', 'flexDirection': 'row', columnGap: '8px'}}>
            <Typography>
              {'- ' + feedBacks[0].name}  
            </Typography>
            <LinkedInIcon className="LinkedInIcon" color="primary" onClick={() => {window.open("https://maimai.cn/contact/share/card?u=q23gewjwffc0&_share_channel=copy_link")}}/> 
          </Box>
          <Typography className="greenColor">
            {feedBacks[0].position}
          </Typography>
        </Box>
      </Paper>
    </Grid>
    <Grid item key={'skillsetbox_2'} xs={3}>
      <Paper elevation={6} sx={{display: 'flex', flexDirection: 'column', padding: '20px', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
        <Typography className="feedback-box-paragraph">
          {feedBacks[1].paragraph}
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
          <Typography>
            {'- ' + feedBacks[1].name} 
          </Typography>
          <Typography className="greenColor">
            {feedBacks[1].position}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  </Grid>
)
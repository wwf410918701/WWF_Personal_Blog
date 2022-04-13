import React from "react";

import Grid from '@mui/material/Grid/Grid';
import Item from '@mui/material/ListItem/ListItem';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { Paper } from "@mui/material";

interface SkillsSetBoxProps {
  skillsets: string[][]
};

// export const SkillsSetBox = ({ skillsets }: SkillsSetBoxProps) => (
//     <Grid container spacing={2} sx={{justifyContent: 'center'}}>
//     {skillsets.map((skillset, index) => (
//       <Grid item key={'skillsetbox_' + index}>
//         <Item>
//           <DoneIcon />
//           {skillset}
//         </Item>
//       </Grid>))}
//     </Grid>
// )

export const SkillsSetBox = ({ skillsets }: SkillsSetBoxProps) => (
  <>
    {skillsets.map((skillset, index) => (
      <Grid container spacing={2} sx={{justifyContent: 'center', marginBottom: '16px'}}>
        <Grid item key={'skillsetbox_' + index} xs={4} >
          <Paper elevation={6} sx={{display: 'flex' ,height: '50px', alignItems: 'center'}}>
            <CheckCircle className="greenColor icon" />
            {skillset[0]}
          </Paper>
        </Grid>
        <Grid item key={'skillsetbox_' + index} xs={4}>
          <Paper elevation={6} sx={{display: 'flex', height: '50px', alignItems: 'center'}}>
            <CheckCircle className="greenColor icon" />
            {skillset[1]}
          </Paper>
        </Grid>
      </Grid>))}
  </>
  )

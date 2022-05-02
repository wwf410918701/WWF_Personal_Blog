import React from "react";

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent/TimelineOppositeContent";
import Typography from "@mui/material/Typography/Typography";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box } from "@mui/system";

export type workExperience = {
  startTime: string;
  endTime: string;
  companyName: string;
  position: string;
  base: string;
  Des: {workOutCome?: string, des: string}[];
}

interface WorkExperiencesBoxProps {
  workExperiences: workExperience[]
}

export const WorkExperiencesBox = ({ workExperiences }: WorkExperiencesBoxProps) => (
  <Timeline position="alternate">
    {workExperiences.map((workExperience, index) => (
      <TimelineItem key={`workExperience_timeLine_${index}`}>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          {`${workExperience.startTime} - ${workExperience.endTime}`}
          <div>{workExperience.base}</div>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            {workExperience.companyName}
          </Typography>
          <Typography>{workExperience.position}</Typography>
          {workExperience.Des.map((d, index) => (
            <Box key={`work_experience_Box_${index}`} sx={{marginTop: '10px'}}>
              <Box sx={{display: 'flex', marginBottom: '5px'}}>
                <CheckCircleOutlineIcon/>
                <Typography>{d.workOutCome}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{textAlign: 'left'}}>{d.des}</Typography>
            </Box>
          ))}
        </TimelineContent>
      </TimelineItem>
    ))}
  </Timeline>
)
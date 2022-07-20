import React from "react";

import { Link, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface DividerProps {
  title: string;
  paragraphs?: JSX.Element[],
  icon: JSX.Element,
}

export const DividerComponent = ({ title, paragraphs, icon }: DividerProps) => (
  <Box className='divider' key={title+'_divider'}
    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
    { icon }
    <Typography variant="h4">
      { title }
    </Typography>
    { paragraphs?.map((paragraph, index) => (
      <Typography variant="h5" className="paragraph" key={title + '_paragraph'+index}>
        {paragraph}
      </Typography>
    ))}
  </Box>
)
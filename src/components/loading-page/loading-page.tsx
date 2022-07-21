import React from "react";

import CircularProgress from '@mui/material/CircularProgress';
import { ContentContainer } from "../shared-cutomsized-components/content-container/content-container";
import Stack from "@mui/material/Stack";

export default function LoadingPage() {
  return (
    <Stack justifyContent='center' alignItems='center' sx={{ width: '100%', height: '100vh' }}>
      <CircularProgress size={50} />
    </Stack>
  );
}
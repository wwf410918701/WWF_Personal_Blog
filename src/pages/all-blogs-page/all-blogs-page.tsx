import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button/Button";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { fetchNextTenPostsSummaries } from "../../firebase/firebase-utils";
import { ContentContainer } from "../../components/shared-cutomsized-components/content-container/content-container";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import Stack from "@mui/material/Stack";
import { SummaryCard } from "../../components/summary-card/summary-card";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AllBlogsPage = () => {
  const [blogSummaries, setBlogSummaries] = useState<any[]>([]);
  const [showFailureMessage, setShowFailureMessage] = useState(false) 
  
  useEffect(() => {
    fetchNextTenPostsSummaries(1, 10)
      .then(postSummaries => {
        setBlogSummaries(postSummaries)})
      .catch(e => {
        console.log('Error when fetching blog initial summarizes')
        setShowFailureMessage(true)
        console.log(e)
      })
  }
  ,[])

  return (
    <ContentContainer>
      <Stack direction='column' spacing={2} sx={{marginTop: '30px'}}>
        {blogSummaries.map(blogSummary => (
          <SummaryCard 
            id={blogSummary.id} 
            title={blogSummary.title} 
            author={blogSummary.author} 
            summary={blogSummary.summary} 
            time={blogSummary.time} 
            posterUrl={blogSummary.posterImgUrl}
          />))}
      </Stack>
      <Snackbar open={showFailureMessage} autoHideDuration={10000} onClose={() => setShowFailureMessage(false)}>
        <Alert onClose={() => setShowFailureMessage(false)} severity="error" sx={{ width: '100%'}}>
          Fail to load blogs, try again later please.
        </Alert>
      </Snackbar>
    </ContentContainer>
  )
}
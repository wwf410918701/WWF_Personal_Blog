import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar/Snackbar";

import { ContentContainer } from "../../components/shared-cutomsized-components/content-container/content-container";
import { fetchPost, fetchPostSummary } from "../../firebase/firebase-utils";
import Paper from "@mui/material/Paper/Paper";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/lab/node_modules/@mui/system/Box";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const BlogPage = () => {
  const [blog, setBlog] = useState('')
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState({
    time: '',
    author: '',
  })
  const [showFailureMessage, setShowFailureMessage] = useState(false) 
  const { blogID } = useParams()
  const id = parseInt(blogID as string)

  useEffect(() => {
    fetchPost(id)
      .then(blogData => {
        setBlog(blogData?.content as string)
        setTitle(blogData?.title)
      })
      .then(() => {
        fetchPostSummary(id)
        .then(summaryData => {
          const createTime = new Date(summaryData?.time.seconds * 1000)
          setSummary({
            time: `${createTime.getFullYear()}/${createTime.getMonth()}/${createTime.getDay()} - ${createTime.getHours()}:${createTime.getMinutes()}`,
            author: summaryData?.author??'unknown'
        })})
      })
      .catch(e => {
        console.log('Error happen when fetching blog')
      })
  }, [])

  return (
    <ContentContainer>
      <Typography variant="h3" sx={{width: '100%', textAlign: 'center', marginTop: '30px'}}>
        {title}
      </Typography>
      <Stack direction='row' spacing={5} justifyContent='center' sx={{margin: '20px'}}>
        <Typography>
          {`By: ${summary.author}`}
        </Typography>
        <Typography>
          Create At: 
          <span style={{color: '#2196f3', marginLeft: '8px', marginRight: '8px'}}>{summary.time}</span>
        </Typography>
      </Stack>
      <Paper sx={{minHeight: '80vh', paddingLeft: '10px'}}>
        <div dangerouslySetInnerHTML={{__html: blog}}></div>
      </Paper>
      <Snackbar open={showFailureMessage} autoHideDuration={10000} onClose={() => setShowFailureMessage(false)}>
        <Alert onClose={() => setShowFailureMessage(false)} severity="error" sx={{ width: '100%'}}>
          Fail to load this blog, try again later please.
        </Alert>
      </Snackbar>
    </ContentContainer>
  )
} 
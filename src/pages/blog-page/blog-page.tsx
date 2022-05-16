import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar/Snackbar";
import Paper from "@mui/material/Paper/Paper";
import Button from '@mui/material/Button';
import { Box, Divider, Stack, TextField, Typography } from "@mui/material";

import { ContentContainer } from "../../components/shared-cutomsized-components/content-container/content-container";
import { createComment, fetchPost, fetchPostSummary } from "../../firebase/firebase-utils";
import { convertToDate } from "../../utils/utils";
import { CommentCard } from "../../components/comment-card/comment-card";
import { RootStoreContext } from "../../App";
import { observer } from "mobx-react-lite";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export type comment = {
  content: string,
  displayName: string,
  createAt?: {
    seconds: number,
    nanoseconds: number,},
  uid: string,
  commentID: number,
}

export const BlogPage = observer(() => {
  const [blog, setBlog] = useState('')
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState({
    time: '',
    author: '',
  })
  const [showFailureMessage, setShowFailureMessage] = useState(false) 
  const [comments, setComments] = useState<comment[]>([])
  const [newCommentText, setNewCommentText] = useState('')
  const [newCommentInputError, setNewCommentInputError] = useState(false)
  const [createCommentErrorMsg, setCreateCommentErrorMsg] = useState(false)

  const { blogID } = useParams()
  const id = parseInt(blogID as string)
  const { userStore } = useContext(RootStoreContext)

  useEffect(() => {
    fetchPost(id)
      .then(blogData => {
        setBlog(blogData?.content as string)
        setTitle(blogData?.title)
        setComments(blogData?.comments)
      })
      .then(() => {
        fetchPostSummary(id)
        .then(summaryData => {
          const createTime = convertToDate(summaryData?.time)
          setSummary({
            time: `${createTime.getFullYear()}/${createTime.getMonth()}/${createTime.getDay()} - ${createTime.getHours()}:${createTime.getMinutes()}`,
            author: summaryData?.author??'unknown'
        })})
      })
      .catch(e => {
        console.log('Error happen when fetching blog')
        setShowFailureMessage(true)
        console.log(e)
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
      <Paper sx={{minHeight: '80vh', padding: '10px'}}>
        <div 
          dangerouslySetInnerHTML={{__html: blog}} 
          style={{wordBreak: 'break-word'}}></div>
      </Paper>
      <Divider textAlign="left" sx={{marginTop: '50px', marginBottom: '20px'}}>
        <Typography variant="h5">
          Comments
        </Typography>
      </Divider>
      {userStore.userID ?
        (<Box sx={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: '50px', flexDirection: 'column' }}>
          <TextField id="outlined-basic" 
            label="Comment..." 
            variant="outlined" 
            sx={{width: '95%'}}
            error={newCommentInputError}
            onChange={(e) => {
              setNewCommentInputError(false)
              setNewCommentText(e.target.value)
            }}
          />
          <Box sx={{width: '95%', display: 'flex', justifyContent: 'end', marginTop: '15px'}}>
            <Button variant="contained" href="#contained-buttons" onClick={() => {
              if(newCommentText.trim().length === 0) {
                setNewCommentInputError(true)
              }
              else {
                createComment(id, newCommentText, userStore.userName, userStore.userID)
                .then(updatedComments => {
                  // setNewCommentText('')
                  setComments(updatedComments)})
                .catch(e => {
                  console.log("Error when creating post")
                  console.log(e)
                  setCreateCommentErrorMsg(true)
                })
              }
            }}>
              Post
            </Button>
          </Box>
        </Box>)
        :
        <div></div>
      }
      <Stack spacing={2}>
        {comments.map((comment, index) => 
          <CommentCard 
            key={`commentCard_${comment.commentID}`}
            commentID={comment.commentID} 
            content={comment.content} 
            displayName={comment.displayName} 
            createAt={comment.createAt}
            allowModify={comment.uid === userStore.userID} 
            blogID={id} 
            updateAfterDeleteAComment={() => {
              return setComments(comments.filter(c => {return c.commentID !== comment.commentID}))}}
          />
        )}
      </Stack>
      <Snackbar open={showFailureMessage} autoHideDuration={10000} onClose={() => setShowFailureMessage(false)}>
        <Alert onClose={() => setShowFailureMessage(false)} severity="error" sx={{ width: '100%'}}>
          Fail to load this blog, try again later please.
        </Alert>
      </Snackbar>
      <Snackbar open={createCommentErrorMsg} autoHideDuration={10000} onClose={() => setCreateCommentErrorMsg(false)}>
        <Alert onClose={() => setCreateCommentErrorMsg(false)} severity="error" sx={{ width: '100%'}}>
          Fail to create comment, try again later please.
        </Alert>
      </Snackbar>
    </ContentContainer>
  )
} )
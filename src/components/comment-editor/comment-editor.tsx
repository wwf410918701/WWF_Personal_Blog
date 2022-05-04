import TextField from "@mui/material/TextField";
import DoneIcon from '@mui/icons-material/Done';
import Stack from "@mui/material/Stack";
import CommentIcon from '@mui/icons-material/Comment';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar/Snackbar";

import React, { useCallback, useContext, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { createComment, updateComment } from "../../firebase/firebase-utils";
import { RootStoreContext } from "../../App";
import Alert from "@mui/material/Alert";

interface CommentEditorProps {
  blogID: number,
  defaultText: string;
  updateParent: (currentText: string) => void;
  setParentMode: (mode: boolean) => void,
  commentID: number,
}

export const CommentEditor = ({ defaultText, updateParent, setParentMode, blogID, commentID }: CommentEditorProps) => {
  const [ifError, setIfError] = useState(false)
  const [showFailureMessage, setShowFailureMessage] = useState(false) 
  const [currentText, setCurrentText] = useState(defaultText)
  const { userStore } = useContext(RootStoreContext)

  return (
    <Box display='flex' width='100%'>
      <TextField className="commentModifyEditor" label="comment"  error={ifError} helperText={ifError? 'Please input' : null} value={currentText}
        sx={{ width: '100%'}}
        onChange={(e) => {
          setIfError(false)
          setCurrentText(e.target.value)}}
      />
      <Stack direction='row'>
        <IconButton sx={{marginLeft: '8px'}} 
          size='small' 
          color='success'
          onClick={() => {
            if(currentText.trim().length === 0){
              setIfError(true)
            }
            else {
              updateComment(blogID, commentID, currentText, userStore.userName, userStore.userID)
              .then(() => {
                updateParent(currentText)
                setParentMode(false)
              })
              .catch(e => {
                console.log('Error when updating the post')
                console.log(e)
                setTimeout(() => setParentMode(false), 1000)
                setShowFailureMessage(true)
              })
              
            }
          }}
        >
          <DoneIcon/>
        </IconButton>
        <Tooltip title="Cancel Modify">
          <IconButton onClick={() => setParentMode(false)} sx={{color: '#80b1da'}} size='small'> 
            <CommentIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Snackbar open={showFailureMessage} autoHideDuration={10000} onClose={() => setShowFailureMessage(false)}>
        <Alert onClose={() => setShowFailureMessage(false)} severity="error" sx={{ width: '100%'}}>
          Fail to update your comment, try again later please.
        </Alert>
      </Snackbar>
    </Box>)
}
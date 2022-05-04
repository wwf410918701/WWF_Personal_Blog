import React, { useState } from "react";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { CommentEditor } from "../comment-editor/comment-editor";
import { comment } from "../../pages/blog-page/blog-page";
import { deleteComment } from "../../firebase/firebase-utils";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { convertToDate } from "../../utils/utils";
interface CommentCardProps {
  content: string,
  displayName: string,
  createAt?: {seconds: number, nanoseconds: number},
  allowModify: boolean,
  commentID: number,
  blogID: number,
  updateAfterDeleteAComment: () => void,
}

export const CommentCard = ({ blogID, content, displayName, createAt, allowModify, commentID, updateAfterDeleteAComment }: CommentCardProps) => {
  const [displayContent, setDisplayContent] = useState(content)
  const [openCancelConfirm, setOpenCancelConfirm] = useState<boolean>(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false) 
  const [modifyMode, setModifyMode] = useState(false)
  
  const createTime = createAt? convertToDate(createAt) : null;

  return(
    <Paper sx={{minHeight: '120px', padding: '20px', paddingBottom: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
        {modifyMode? 
          <CommentEditor defaultText={displayContent} updateParent={(newText: string) => setDisplayContent(newText)} 
            setParentMode={(newMode: boolean) => setModifyMode(newMode)} commentID={commentID} blogID={blogID}
          /> 
          : 
          displayContent}
        {allowModify? 
          (<Stack direction='row' >
            {modifyMode?
            null
             :
            (<>
              <IconButton onClick={() => setModifyMode(true)} size='small'> 
                <ModeEditIcon sx={{color: '#80b1da'}}/>
              </IconButton>
              <IconButton color="error" size='small' onClick={() => setOpenCancelConfirm(true)}> 
                <DeleteIcon />
              </IconButton>
             </>)}
            <Dialog onClose={() => setOpenCancelConfirm(false)} open={openCancelConfirm}>
              <DialogTitle>Are you sure to delete this comment? 
                <span style={{color: "#ff1744", marginLeft: '8px'}}>
                  (Can't recover!)
                  <Stack direction='row' spacing={2} justifyContent='center' sx={{marginTop: '10px'}}>
                    <Button variant='outlined' color='error' onClick={() =>{
                      deleteComment(blogID, commentID)
                      .then(() => {
                        updateAfterDeleteAComment()
                        setOpenCancelConfirm(false)
                      })
                      .catch(e => {
                        setShowFailureMessage(true)
                        console.log('Error when deleting comment')
                        console.log(e)
                      })
                    }}>
                      Confirm
                    </Button>
                    <Button variant="outlined" onClick={() => setOpenCancelConfirm(false)}>
                      Cancel
                    </Button>
                  </Stack>
                </span>
              </DialogTitle>
            </Dialog>
          </Stack>)
          :
          null
        }
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end'}}>
        <Stack direction='row' >
          {`By: ${displayName}`}
          <span style={{color: '#2196f3', marginLeft: '20px'}}>
            {createTime? 
            `${createTime.getFullYear()}/${createTime.getMonth()}/${createTime.getDay()} - ${createTime.getHours()}:${createTime.getMinutes()}` 
            : 
            'create time unknown'}
          </span>
        </Stack>
      </Box>
      <Snackbar open={showFailureMessage} autoHideDuration={10000} onClose={() => setShowFailureMessage(false)}>
        <Alert onClose={() => setShowFailureMessage(false)} severity="error" sx={{ width: '100%'}}>
          Fail to update your comment, try again later please.
        </Alert>
      </Snackbar>
    </Paper>
  )
}
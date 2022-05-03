import React, { useState } from "react";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";

interface CommentCardProps {
  content: string,
  displayName: string,
  createAt?: {seconds: number, nanoseconds: number},
  allowModify: boolean
}

export const CommentCard = ({ content, displayName, createAt, allowModify }: CommentCardProps) => {
  const [displayContent, setDisplayContent] = useState(content)
  const [openCancelConfirm, setOpenCancelConfirm] = useState<boolean>(false);

  return(
    <Paper sx={{minHeight: '120px', padding: '20px', paddingBottom: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between'}}>
        {displayContent}
        <Stack direction='row' >
          <IconButton> 
            <ModeEditIcon sx={{color: '#80b1da'}}/>
          </IconButton>
          <IconButton color="error"> 
            <DeleteIcon />
          </IconButton>
          <Dialog onClose={() => setOpenCancelConfirm(false)} open={openCancelConfirm}>
            <DialogTitle>Are you sure to delete this blog? 
              <span style={{color: "#ff1744", marginLeft: '8px'}}>
                (Can't recover!)
                <Stack direction='row' spacing={2} justifyContent='center' sx={{marginTop: '10px'}}>
                  <Button variant='outlined' color='error'>
                    Confirm
                  </Button>
                  <Button variant="outlined">
                    Cancel
                  </Button>
                </Stack>
              </span>
            </DialogTitle>
          </Dialog>
        </Stack>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end'}}>
        <Stack direction='row' >
          {`By: ${displayName}`}
          <span style={{color: '#2196f3', marginLeft: '20px'}}>
            {createAt?? 'create time unknown'}
          </span>
        </Stack>
      </Box>
    </Paper>
  )
}
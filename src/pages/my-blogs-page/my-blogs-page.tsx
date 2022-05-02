import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";

import { RootStoreContext } from "../../App";
import { ContentContainer } from "../../components/shared-cutomsized-components/content-container/content-container";
import { SummaryCard } from "../../components/summary-card/summary-card";
import { addBlogToUserAccount, deletePost, fetchPostSummary } from "../../firebase/firebase-utils";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

export const MyBlogsPage = observer(() => {
  const [openCancelConfirm, setOpenCancelConfirm] = useState<{[index: string]: boolean}>({});

  const { userStore } = useContext(RootStoreContext)
  const [blogSummaries, setBlogSummaries] = useState<any[]>([])
  useEffect(() => {
    Promise.allSettled(userStore.userBlogs.map(blogid => fetchPostSummary(blogid)))
    .then(results => {
      setBlogSummaries(results.map(result => {
        if(result.status === "fulfilled") {
          return result.value
        }}
      ).filter(resultValue => resultValue)
      );
    })
  }, [userStore.userBlogs])

  // console.log('my blogs')
  // console.log(userStore.userBlogs)

  return (
    <ContentContainer>
      <Divider sx={{marginTop: '80px', marginBottom: '50px'}}>
        <Typography variant="h4">
          Your Posts
        </Typography>
      </Divider>
      <Stack direction='column' spacing={3} sx={{marginTop: '30px', border: '0.5px solid ', padding: '30px', borderColor: '#424242', borderRadius: '35px'}}>
      {blogSummaries.map(blogSummary => (
        <Stack direction='row' alignItems='center'>
          <Box sx={{width: '100%'}}>
            <SummaryCard 
              id={blogSummary.id} 
              key={blogSummary.id}
              title={blogSummary.title} 
              author={blogSummary.author} 
              summary={blogSummary.summary} 
              time={blogSummary.time} 
              posterUrl={blogSummary.posterImgUrl}
            />
          </Box>
          <Stack>
            <Button onClick={() => {}}> 
              <ModeEditIcon />
            </Button>
            <Button color="error" onClick={() => {setOpenCancelConfirm({[blogSummary.id]: true})}}> 
              <DeleteIcon />
            </Button>
            <Dialog onClose={() => setOpenCancelConfirm({[blogSummary.id]: false})} open={openCancelConfirm[blogSummary.id as string]}>
              <DialogTitle>Are you sure to delete this blog? 
                <span style={{color: "#ff1744", marginLeft: '8px'}}>
                  (Can't recover!)
                  <Stack direction='row' spacing={2} justifyContent='center' sx={{marginTop: '10px'}}>
                    <Button variant='outlined' color='error'
                      onClick={() => {
                        setOpenCancelConfirm({[blogSummary.id]: false})
                        deletePost(blogSummary.id, userStore.userID)
                        .then(() => {
                          setBlogSummaries(blogSummaries.filter(blogSummaryarray => blogSummaryarray.id !== blogSummary.id))
                        })
                        .catch(error => {
                          console.log("Error when deleting blogs " + " postID")
                          console.log(error)
                        })
                      }
                      }
                    >Confirm
                    </Button>
                    <Button variant="outlined"
                      onClick={() => {
                        setOpenCancelConfirm({[blogSummary.id]: false})
                        }
                      }
                    >
                      Cancel
                    </Button>
                  </Stack>
                </span>
              </DialogTitle>
            </Dialog>
          </Stack>
        </Stack>
      ))}
      </Stack>  
    </ContentContainer>
  )
})
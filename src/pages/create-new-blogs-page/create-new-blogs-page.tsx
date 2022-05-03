
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Snackbar from "@mui/material/Snackbar/Snackbar";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack/Stack";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography/Typography";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import DeleteIcon from '@mui/icons-material/Delete';
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton/IconButton";

import MyEditor from "../../components/editor/editor";
import { ContentContainer } from "../../components/shared-cutomsized-components/content-container/content-container";
import { fetchPost, fetchPostSummary, storePost, updatePost, uploadImg } from "../../firebase/firebase-utils";
import { RootStoreContext } from "../../App";
import { observer } from "mobx-react-lite";
import { getObjectURL } from "../../utils/get-local-file-url";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


interface TitleBoxProps {
  title: string;
}

export const TitleBox = ({ title }: TitleBoxProps) => (
  <Typography variant="h4" sx={{width: '100%', alignText: 'left', marginTop: '20px', marginBottom: '20px'}}>
    {title}
  </Typography>
)

export const CreateNewBlogsPage = observer(() => {
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false);
  const [title, settitle] = useState('')
  const [summary, setSummary] = useState('')
  const [paragraph, setParagraph] = useState("<p>Enjoying writing!</p>")
  const [errorTextFields, setErrorTextField] = useState<{[index: string]: boolean}>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showFailureMessage, setShowFailureMessage] = useState(false) 
  const [poster, setPoster] = useState<string | null>(null)
  const [posterImg, setPosterImg] = useState<File | null>(null)
  const navigate = useNavigate();
  const { userStore } = useContext(RootStoreContext)

  //null when this component as create new blog page, not null when as edit blog
  const { blogID } = useParams()

  useEffect(() => {
    if(blogID) {
      const blogIDforEdit = parseInt(blogID)
      fetchPost(blogIDforEdit)
      .then(blogContent => {
        setParagraph(blogContent?.content)
        settitle(blogContent?.title)
      })
      .then(() => {
        fetchPostSummary(blogIDforEdit)
        .then(blogSummary => {
          setSummary(blogSummary?.summary)
          setPoster(blogSummary?.posterImgUrl)
        })
        .catch(e => {
          console.log('Error when fetching the summary of the blog to be edited')
          console.log(e)
        })
      })
      .catch(error => {
        console.log('Error when feching the blog to be edited.')
        console.log(error)
      })
    }
  }, [blogID])

  return (
    <ContentContainer>
      <Stack direction='column' alignItems='center' sx={{marginTop: '30px'}}>
        <TitleBox title={'Title'}/>
        <TextField fullWidth label="title..." id="fullWidth" variant="filled" value={title}
          onChange={(e) => {
            settitle(e.target.value)
            setErrorTextField({...errorTextFields, title: false})
          }}  
          error={errorTextFields['title']}/>
        <TitleBox title={'Summary'}/>
        <TextField fullWidth label="summary..." id="fullWidth" variant="filled"  value={summary}
          onChange={(e) => {
            setSummary(e.target.value)
            setErrorTextField({...errorTextFields, summary: false})
          }} 
          error={errorTextFields['summary']}
        />
        <TitleBox title={'Poster of this blog'}/>
        <Box sx={{width: '100%', display: 'flex'}}>
          {poster? 
            (<Stack direction='row' spacing={2}>
              <img src={poster} alt={`poster`} style={{width: '200px', height: '200px', border: '1px solid', borderColor: '#9e9e9e', marginLeft: '20px'}}/>
              <Button color="error" onClick={() => {
                setPoster(null)
                setPosterImg(null)
              }}> 
                <DeleteIcon />
              </Button>
            </Stack>)
            :
            (<label htmlFor="releaseTicket_detail_uploadFile">
                  <Input id="releaseTicket_detail_uploadFile" type="file" 
                    onChange={(e: any) => {
                      const uploadFile = document.getElementById("releaseTicket_detail_uploadFile") as any;
                      const uploadFileSRC = uploadFile.files[0]
                      setPoster(getObjectURL(uploadFileSRC))
                      setPosterImg(uploadFile.files[0])
                    }}
                    sx={{display: 'none'}}
                  />
                  <IconButton component="span" sx={{border: '1px solid', borderRadius: '15px', width: '100px', height: '100px', marginLeft: '20px'}}>
                    <PhotoLibraryIcon />
                  </IconButton>
                </label>)
          }
        </Box>
        <TitleBox title={'Post'}/>
        <Box sx={{width: '100%'}}>
          <MyEditor placeholder={paragraph} updateCallback={(htmlString: string) => {setParagraph(htmlString)}}/>
        </Box>
        <Stack direction='row' spacing={5} sx={{marginTop: '50px'}}>
          <Button variant="contained" component="span" sx={{width: '200px', height: '50px'}} color='success'
            onClick={async () => {
              let validated = true
              if (!title || title.trim().length === 0) {
                setErrorTextField({title: true})
                validated = false
              }
              if(!summary || summary.trim().length === 0) {
                setErrorTextField((preState) => ({...preState, summary: true}))
                validated = false
              }
              if(validated) {
                if(!posterImg) {
                  if(poster) {
                    if(blogID? (await updatePost(blogID, title, summary, paragraph, userStore.userName, poster, userStore.userID))
                      :
                      (await storePost(title, summary, paragraph, userStore.userName, poster, userStore.userID))
                    ) {
                      setShowSuccessMessage(true)
                      setTimeout(() => {navigate('/blogs/')}, 500)
                    }
                    else {
                      setShowFailureMessage(true)
                    }
                  }
                  else{
                    if(blogID? (await updatePost(blogID, title, summary, paragraph, userStore.userName, null, userStore.userID))
                      :
                      (await storePost(title, summary, paragraph, userStore.userName, null, userStore.userID))
                    ) {
                      setShowSuccessMessage(true)
                      setTimeout(() => {navigate('/blogs/')}, 500)
                    }
                    else {
                      setShowFailureMessage(true)
                    }
                  }
                }
                else {
                  uploadImg(posterImg?.name, posterImg)
                  .then(async (posterImgUrl) => {
                    if(blogID? (await updatePost(blogID, title, summary, paragraph, userStore.userName, posterImgUrl, userStore.userID))
                      :
                      (await storePost(title, summary, paragraph, userStore.userName, posterImgUrl, userStore.userID))) {
                      setShowSuccessMessage(true)
                      setTimeout(() => {navigate('/blogs/')}, 500)
                    }
                    else {
                      setShowFailureMessage(true)
                    }
                  })
                }
              }
            }}
          >
            Done
          </Button>
          <Button variant="contained" component="span" sx={{width: '200px', height: '50px'}}
            onClick={() => {
              setOpenCancelConfirm(true)}}
          >
            Cancel
          </Button>
          <Dialog onClose={() => setOpenCancelConfirm(false)} open={openCancelConfirm}>
            <DialogTitle>Are you sure? 
              <span style={{color: "#ff1744", marginLeft: '8px'}}>
                (The draft will be discarded)
                <Stack direction='row' spacing={2} justifyContent='center' sx={{marginTop: '10px'}}>
                  <Button variant='outlined' color='error'
                    onClick={() => {
                      setOpenCancelConfirm(false)
                      navigate('/blogs/')}
                    }
                  >Confirm
                  </Button>
                  <Button variant="outlined"
                    onClick={() => {
                      setOpenCancelConfirm(false)
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
      <Snackbar open={showSuccessMessage} autoHideDuration={3000} onClose={() => setShowSuccessMessage(false)}>
        <Alert onClose={() => setShowSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
          Successfully save the post. Now redirecting to the All Post page.
        </Alert>
      </Snackbar>
      <Snackbar open={showFailureMessage} autoHideDuration={3000} onClose={() => setShowFailureMessage(false)}>
        <Alert onClose={() => setShowFailureMessage(false)} severity="error" sx={{ width: '100%'}}>
          Opps, some errors happened when trying to save your post. Please try again later.
        </Alert>
      </Snackbar>
    </ContentContainer>
  )
})
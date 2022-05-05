import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SummaryCard } from "../../components/summary-card/summary-card";
import HireMeBanner from '../../data/images/hireme.jpg';
import OnlineEditorPic from '../../data/images/online-editor.png';
import ES21Pic from '../../data/images/ES21.png';
import { fetchNextTenPostsSummaries, fetchPostSummary } from "../../firebase/firebase-utils";
import { ContentContainer } from "../../components/shared-cutomsized-components/content-container/content-container";
import { AutoSlideWrapper } from "../../components/auto-slide-wrapper/auto-slide-wrapper";

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar/Snackbar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from "@mui/material/IconButton";
import Tooltip from '@mui/material/Tooltip';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const recommdBlogIndexs = [{blogKey: 2, src: HireMeBanner, title: 'Looking for frontend developer intern opportunity!'},
  {blogKey: 4, src: OnlineEditorPic, title: 'Set up an online editor based on WangEditor and Firestore!'},
  {blogKey: 3, src: ES21Pic, title: "What's new in ECMAScript 2020?"},
]

export const AllBlogsPage = () => {
  const [blogSummaries, setBlogSummaries] = useState<any[]>([]);
  const [showFailureMessage, setShowFailureMessage] = useState(false) 
  const [loadStatus, setLoadStatus] = useState({
    summariesCount: 0,
    startIndex: 1,
  })
  const [hasMoreSummaries, setHasMoreSummaries] = useState(false)
  const navigate = useNavigate()

  const loadSummaries = (startIndex: number, summariesNumToFetch: number) => {
    fetchNextTenPostsSummaries(startIndex, summariesNumToFetch)
      .then(postSummaries => {
        if (postSummaries.length > 0) {
          setBlogSummaries([...blogSummaries, ...postSummaries]);
          setLoadStatus((preLoadStatus) => {
            return {summariesCount: preLoadStatus.summariesCount + postSummaries.length,
              startIndex: preLoadStatus.startIndex + postSummaries.length +1}
          })
        }
        else {
          setHasMoreSummaries(false)
          return false
        }
        return true
      })
      .catch(e => {
        console.log('Error when fetching blog initial summarizes')
        setShowFailureMessage(true)
        console.log(e)
      })
  }

  const checkIfThereMoreSummaries = () => {
    if((loadStatus.summariesCount !== 0) && ((loadStatus.summariesCount % 10) ===0)) {
      setHasMoreSummaries(true)
    }
    else {
      setHasMoreSummaries(false)
    }
  }

  useEffect(() => {
    loadSummaries(loadStatus.startIndex, 10)
  }
  ,[])

  //Check it there are more blog summaries to load whenever the loadStatus changes
  useEffect(() => {
    checkIfThereMoreSummaries()
  }, [loadStatus])

  return (
    <>
      <AutoSlideWrapper>
        {recommdBlogIndexs.map(recommdBlogIndex => (
          <Box sx={{width: '100%', justifyContent: 'center', cursor: 'pointer', display: 'flex'}} onClick={() => {navigate(`/blogs/blogPage/${recommdBlogIndex.blogKey}`)}} >
            <Box>
              <img src={recommdBlogIndex.src} alt={recommdBlogIndex.title} style={{width: '1200px', height: '400px', borderRadius: '15px'}}/>
              <Typography variant="h5" sx={{fontWeight: '1000',position: 'absolute', color: '#424242', top: '0', marginLeft: '30px', width: '100%', marginTop: '20px' }}>
                {recommdBlogIndex.title}
              </Typography>
            </Box>
          </Box>
        ))}
      </AutoSlideWrapper>
      <ContentContainer>
        <Divider>
          Blogs
        </Divider>
        <Stack direction='column' spacing={3} sx={{marginTop: '30px'}}>
          {blogSummaries.map(blogSummary => 
            <SummaryCard 
              id={blogSummary.id} 
              key={blogSummary.id}
              title={blogSummary.title} 
              author={blogSummary.author} 
              summary={blogSummary.summary} 
              time={blogSummary.time} 
              posterUrl={blogSummary.posterImgUrl}
            />)}
        </Stack>
        <Box sx={{ width: '100%', justifyContent: 'center', display: hasMoreSummaries? 'flex': 'none'}}>
          <Tooltip title='Load More'>
            <IconButton size='large' onClick={() => loadSummaries(loadStatus.startIndex, 10)}>
              <ExpandMoreIcon sx={{ width: '50px', height: '50px', color: '#90caf9' }}/>
            </IconButton>
          </Tooltip>
        </Box>
        <Snackbar open={showFailureMessage} autoHideDuration={10000} onClose={() => setShowFailureMessage(false)}>
          <Alert onClose={() => setShowFailureMessage(false)} severity="error" sx={{ width: '100%'}}>
            Fail to load blogs, try again later please.
          </Alert>
        </Snackbar>
      </ContentContainer>
    </>
  )
}
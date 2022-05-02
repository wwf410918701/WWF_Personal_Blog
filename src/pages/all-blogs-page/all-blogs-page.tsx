import React, { useEffect, useState } from "react";
import { AutoSlideWrapper } from "../../components/auto-slide-wrapper/auto-slide-wrapper";

import Button from "@mui/material/Button/Button";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { fetchNextTenPostsSummaries, fetchPostSummary } from "../../firebase/firebase-utils";
import { ContentContainer } from "../../components/shared-cutomsized-components/content-container/content-container";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import Stack from "@mui/material/Stack";
import { SummaryCard } from "../../components/summary-card/summary-card";
import HireMeBanner from '../../data/images/hireme.jpg';
import OnlineEditorPic from '../../data/images/online-editor.png';
import ES21Pic from '../../data/images/ES21.png';
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

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
// const recommdBlogIndexs = [{blogKey: 2, src: HireMeBanner, title: 'Looking for frontend developer intern opportunity!'},]

export const AllBlogsPage = () => {
  const [blogSummaries, setBlogSummaries] = useState<any[]>([]);
  const [showFailureMessage, setShowFailureMessage] = useState(false) 
  const navigate = useNavigate()

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
          {blogSummaries.map(blogSummary => (
            <SummaryCard 
              id={blogSummary.id} 
              key={blogSummary.id}
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
    </>
  )
}
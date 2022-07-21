import React, { useEffect, useState } from "react";

import Container from '@mui/material/Container';
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography/Typography";
import Grid from '@mui/material/Grid/Grid';
import Item from '@mui/material/ListItem/ListItem';
import { Toolbar, Button, Link, Stack, IconButton } from "@mui/material";
import CodeIcon from '@mui/icons-material/Code';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import PeopleAlt from '@mui/icons-material/PeopleAlt';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

import { HeaderNavBar } from '../../components/header-nav-bar/header-nav-bar';
import ProgrammerPic from '../../data/images/programmer.png';
import { DividerComponent } from '../../components/divider/divider';
import { ProjectDetailBox } from "../../components/project-detail-box/project-detail-box";
import { SkillsSetBox } from "../../components/skills-set-box/skills-set-box";
import { WorkMateFeedbackBox } from '../../components/workmate-feedbacks-box/workmate-feedback-box';
import { GoogleMap } from '../../components/google-map/google-map';
import { ContactInputBox } from "../../components/contact-input-box/contact-input-box";
import { workExperience, WorkExperiencesBox } from "../../components/work-experiences/work-experiences";
import { ContentContainer } from "../../components/shared-cutomsized-components/content-container/content-container";
import { useInView } from "react-intersection-observer";

const workExperiences: workExperience[] = [{
  startTime: 'Dec 2021',
  endTime: 'Apr 2022',
  companyName: 'SenseTime',
  position: 'Frontend Developer Intern - Autodrive Dataplatform Department',
  base: 'ShenZhen',
  Des: [{workOutCome: 'Automated Data Report', 
    des: 'Used React, Typescript, TinyMCE , Antd(ant design), AntV to create an automated data report panel, which provides overall accumulated histograms and detail tables about the cases of a round of auto drive road test. Users can filter the cases that they want to show and make or modify reviews on the rows of case data that needs to be awared of. Last but not least, users can conviently ouput the whole form to PDF then share with others.'},
  {workOutCome: 'Automatically Generated FrontEnd',
    des: 'Used React & Typescript to create an operating panel for users to create web pages of different types of quality test, user can spcify details of the created page such as which data visualization tabs the page should contains, which datasets to include, corresponding frontend page will be generated automatically. Users can also do CRUD on the existing test pages.'},
  {workOutCome: 'Simulated Road Editor',
    des: 'Created new features, such as allowing users to add pedestrians and set the routines that pedestrians will run on the preview mode, adding loading and error pages.'}]},
  {startTime: 'Jul 2020',
  endTime: 'Oct 2020',
  companyName: 'Procter & Gamble',
  position: 'IT Intern - IT department',
  base: 'GuangZhou',
  Des: [{workOutCome: 'Backend SQL APIs', des: "Developed two APIs on P&G's loyalty system to fetch customer's data from different data bases and push the results to message queue."},
  {workOutCome: 'Code Optimization', des: 'Optimized 10+ code errors and warnings that were detected by sonarqube.'},
  {workOutCome: 'Backend Internationalization',
    des: 'Analysised and determined which part of the loyalty system will be used by the foreign frontend users, translated thoseAPI, paramaters, DTO into English.'}]}]

export const PersonalDetailPage = () => {
    const headerItems = [{title: "Welcome to Jimmy's website", navigation: () => {}}]
    const skillsets = [['React', 'Typescript'], ['Javascript', 'Redux & Its popular middlewares'], ['Material UI', 'ANTD'], ['Styled Component', 'SCSS'] ]
    const workmateFeedback = [{paragraph: 'WeiFeng has solid knowledge of key techniques in frontend development like react, js, hence he was really fast to adapt and start building apps after arrived at company. Besides, I was impressed by his good learning ability, when facing with tasks that contains unfamiliar techniques, he can grasp the skills fastly then begin working.'
      , name: 'WeiBin Zhou', position: 'Frontend developer, Sensetime'}, 
    {paragraph: "I would say WeiFeng is a reliable workmate, he didn't afraid to overcome challenges and can delivery complicated features on time and in high quality.", 
    name: 'Liang Yu', position: 'Senior fullstack developer, Sensetime'}]
    const [workExpRef, workExpInView, workExpEntry] = useInView({
      /* Optional options */
      threshold: 0.15,
    });
    const [projExpRef, projInView, projEntry] = useInView({
      /* Optional options */
      threshold: 0.15,
    });
    const [skillsRef, skillsInView, skillsEntry] = useInView({
      /* Optional options */
      threshold: 0.15,
    });
    const [feedbackRef, feedbackInView, feedbackEntry] = useInView({
      /* Optional options */
      threshold: 0.15,
    });
    const [hireMeRef, hireMeInView, hireMeEntry] = useInView({
      /* Optional options */
      threshold: 0.15,
    });

    useEffect(() => {
      console.log('workExpInView')
      console.log(workExpInView)
    }, [workExpInView])

    return (
        <>
          <Box sx={{ width: '100%', height: '100vh'}}>
            <HeaderNavBar>
              <Typography variant='h5' color='white'>
                Welcome to Jimmy's website
              </Typography>
            </HeaderNavBar>
            <Box sx={{ minWidth: '100%', minHeight: '100%', display: 'flex', alignItems: 'center' }}>
              {/* introduction */}
              <Grid container spacing={2} sx={{ minWidth: '100%', minHeight: '100%', display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={8}>
                  <Item>
                    <Box>
                      <Box sx={{marginBottom: '20px'}}>
                        <Typography variant="h4">
                          Hi, I'm Jimmy{<LinkedInIcon className="LinkedInIcon" color="primary" sx={{marginLeft: '5px'}} onClick={() => {window.open("https://www.linkedin.com/in/%E4%BC%9F%E9%94%8B-%E5%90%B4-6b829b1a2/?locale=en_US")}}/>}
                          , a frontend developer.
                        </Typography>
                        <Typography variant="h4">
                          I am currently looking for internship opportunity. 
                        </Typography>
                        <Typography variant="h5" className="paragraph">
                          I am now a student of unimelb, majoring in master of IT. 
                          I previously worked as frontend developer intern in Sensetime, which is a huge Chinese AI company. 
                          Besides, I also worked in P&G China as developer intern.
                          Building apps is both my job and interests.
                        </Typography>
                      </Box>
                      <Toolbar sx={{justifyContent: 'center'}}>
                        <Stack direction='row' spacing={5}>
                          <Button variant="contained"  color='success' 
                            onClick={() => {document.querySelector('#contactMe')?.scrollIntoView({behavior: 'smooth'})}}
                          >
                            <span style={{color: '#fff'}}>Work With Me</span>
                          </Button>
                          <Button variant="outlined" style={{color: '#651fff'}} color='secondary' 
                            onClick={() => {document.querySelector('#workmateFeedback')?.scrollIntoView({behavior: 'smooth'})}}
                          >
                            <span style={{color: '#ce93d8'}}>Feedback from my workmates</span>
                          </Button>
                          <Button variant="outlined"
                            onClick={() => {document.querySelector('#myProject')?.scrollIntoView({behavior: 'smooth'})}}
                          >
                            See My Past Work
                          </Button>
                        </Stack>
                      </Toolbar>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <img src={ProgrammerPic} style={{width: '80%', height: '70%', marginLeft: '50px', marginTop: '50px'}}></img>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <>
            <ContentContainer customizedStyles={{ visibility: workExpInView? null : 'hidden', transition: 'linear 0.3s', opacity: workExpInView? '88%': '0%' }}>
              <Box ref={workExpRef}>
                {/* work experiences */}
                <DividerComponent key='work-experiences'
                  title={'Work Experiences'}  
                  icon={<WorkHistoryIcon className="dividerIcon" style={{ fontSize: '50px', marginBottom: '15px' }}/>}
                />
                <WorkExperiencesBox workExperiences={workExperiences}/>
              </Box>
            </ContentContainer>
            <ContentContainer customizedStyles={{ visibility: projInView? null : 'hidden', transition: 'linear 0.3s', opacity: projInView? '88%': '0%'}}>
              <Box ref={projExpRef}>
                {/* project-details */}
                <DividerComponent key='project-details'
                  title={'My Projects'} 
                  paragraphs={
                    [<Typography variant="h5" className="paragraph">
                      {'Detail codes in my '}
                      <Link href="https://github.com/wwf410918701?tab=repositories" underline="hover">
                          github
                      </Link> 
                    </Typography>]} 
                  icon={<CodeIcon className="dividerIcon" style={{ fontSize: '50px', marginBottom: '15px' }}/>}
                />
                <ProjectDetailBox />
              </Box>
            </ContentContainer>
            <ContentContainer customizedStyles={{ visibility: skillsInView? null : 'hidden', transition: 'linear 0.3s', opacity: skillsInView? '88%': '0%' }}>
              <Box ref={skillsRef}>
                {/* Skills & Technologies */}
                <DividerComponent key='Skills & Technologies'
                  title={'Skills & Technologies'} 
                  paragraphs={
                    [<Typography variant="h5" className="paragraph">
                      Contains but not limits to.
                    </Typography>]} 
                  icon={<DeveloperModeIcon className="dividerIcon" style={{ fontSize: '50px', marginBottom: '15px' }}/>}
                />
                <SkillsSetBox skillsets={skillsets}/>
              </Box>
            </ContentContainer>
            <ContentContainer customizedStyles={{ visibility: feedbackInView? null : 'hidden', transition: 'linear 0.3s', opacity: feedbackInView? '88%': '0%' }}>
              <Box ref={feedbackRef}>
                {/* workmate feedback */}
                <DividerComponent icon={<PeopleAlt className="dividerIcon" style={{ fontSize: '50px', marginBottom: '15px' }}/>} 
                  title='Feedbacks From My Workmates'
                />
                <WorkMateFeedbackBox feedBacks={workmateFeedback}/>
              </Box>
            </ContentContainer>
            <ContentContainer customizedStyles={{ visibility: hireMeInView? null : 'hidden', transition: 'linear 0.3s', opacity: hireMeInView? '88%': '0%' }}>
              <Box ref={hireMeRef}>
                {/* contact box */}
                <DividerComponent title="Hire Me" paragraphs={[
                  <Typography variant="h5" className="paragraph" sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <div>
                      My base and contact details are as followed.
                    </div>
                    <LinkedInIcon className="LinkedInIcon" color="primary" sx={{marginLeft: '5px'}} onClick={() => {window.open("https://www.linkedin.com/in/%E4%BC%9F%E9%94%8B-%E5%90%B4-6b829b1a2/?locale=en_US")}}/>
                  </Typography>]}
                  icon={<ContactPageIcon className="dividerIcon" style={{ fontSize: '50px', marginBottom: '15px' }}/>}
                />
                <Grid id='contactMe' container spacing={2} sx={{ justifyContent: 'center', }}>
                  <Grid item xs={8}>
                    <Box sx={{ height: '500px'}}>
                      <GoogleMap />
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <ContactInputBox />
                  </Grid>
                </Grid>
              </Box>
            </ContentContainer>            
          </>
        </>
    );
}

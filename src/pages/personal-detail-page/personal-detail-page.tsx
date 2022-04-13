import React from "react";

import Container from '@mui/material/Container';
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography/Typography";
import Grid from '@mui/material/Grid/Grid';
import Item from '@mui/material/ListItem/ListItem';
import { AppBar, Toolbar, IconButton, Button, Link } from "@mui/material";
import CodeIcon from '@mui/icons-material/Code';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import PeopleAlt from '@mui/icons-material/PeopleAlt';
import ContactPageIcon from '@mui/icons-material/ContactPage';

import { HeaderNavBar } from '../../components/header-nav-bar/header-nav-bar';
import ProgrammerPic from '../../data/images/programmer.png';
import { Divider } from '../../components/divider/divider';
import { ProjectDetailBox } from "../../components/project-detail-box/project-detail-box";
import { SkillsSetBox } from "../../components/skills-set-box/skills-set-box";
import { WorkMateFeedbackBox } from '../../components/workmate-feedbacks-box/workmate-feedback-box';
import { GoogleMap } from '../../components/google-map/google-map';
import { ContactInputBox } from "../../components/contact-input-box/contact-input-box";

export const PersonalDetailPage = () => {
    const headerItems = ["Welcome to Jimmy's website"]
    const skillsets = [['React', 'Typescript'], ['Javascript', 'Redux & Its popular middlewares'], ['ANTD', 'Material UI'] ]
    const workmateFeedback = [{paragraph: 'WeiFeng has solid knowledge of key techniques in frontend development like react, js, hence he was really fast to adapt and start building apps after arrived at company. Besides, I was impressed by his good learning ability, when facing with tasks that contains unfamiliar techniques, he can grasp the skills fastly then begin working.'
      , name: 'WeiBin Zhou', position: 'Frontend developer, Sensetime'}, 
    {paragraph: "I would say WeiFeng is a reliable workmate, he didn't afraid to overcome challenges and can delivery complicated features on time and in high quality.", 
    name: 'Liang Yu', position: 'Senior fullstack developer, Sensetime'}]

    return (
        <>
          <HeaderNavBar headerItems={headerItems}/>
          <Container sx={{ minHeight: '100vh', minWidth: '100%', paddingBottom: '100px' }}>
            <Grid container spacing={2} sx={{ minWidth: '100%' }}>
              <Grid item xs={8}>
                <Item>
                  <Box sx={{ padding: '20px', marginTop: '100px' }}>
                    <Box sx={{marginBottom: '20px'}}>
                      <Typography variant="h4">
                        Hi, I'm Jimmy, a frontend developer.
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
                      <Button variant="contained" style={{marginRight: '50px'}} color='success' 
                        onClick={() => {document.querySelector('#contactMe')?.scrollIntoView({behavior: 'smooth'})}}
                      >
                        <span style={{color: '#fff'}}>Work With Me</span>
                      </Button>
                      <Button variant="outlined"
                        onClick={() => {document.querySelector('#myProject')?.scrollIntoView({behavior: 'smooth'})}}
                      >
                        See My Past Work
                      </Button>
                    </Toolbar>
                  </Box>
                </Item>
              </Grid>
              <Grid item xs={3}>
               <img src={ProgrammerPic} style={{width: '80%', height: '70%', marginLeft: '50px', marginTop: '50px'}}></img>
              </Grid>
            </Grid>
            <Divider key='project-details'
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
            <Divider key='Skills & Technologies'
              title={'Skills & Technologies'} 
              paragraphs={
                [<Typography variant="h5" className="paragraph">
                  Contains but not limits to.
                </Typography>]} 
              icon={<DeveloperModeIcon className="dividerIcon" style={{ fontSize: '50px', marginBottom: '15px' }}/>}
            />
            <SkillsSetBox skillsets={skillsets}/>
            <Divider icon={<PeopleAlt className="dividerIcon" style={{ fontSize: '50px', marginBottom: '15px' }}/>} 
              title='Feedbacks From My Workmates'
            />
            <WorkMateFeedbackBox feedBacks={workmateFeedback}/>
            <Divider title="Hire Me" paragraphs={[<Typography variant="h5" className="paragraph">My contact details are as followed.</Typography>]}
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
          </Container>
        </>
    );
}

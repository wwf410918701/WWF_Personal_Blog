import React, { useState } from "react";

import { auth, signInWithGoogle, storeUser } from "../../firebase/firebase-utils";
import { ContentContainer } from "../../components/shared-cutomsized-components/content-container/content-container";

import Snackbar from "@mui/material/Snackbar/Snackbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from "@mui/material/IconButton";

interface SignInOrSignUpPageProps {
  signInMode: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SignInOrSignUpPage = ({ signInMode }: SignInOrSignUpPageProps) => {
  const [errorInput, setErrorInput] = useState<{[index: string]: boolean}>({})
  const [showFailureMessage, setShowFailureMessage] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const navigate = useNavigate()

  const handleSignUp = async() => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password)
      await storeUser(user?.uid, displayName, email, new Date(), [])
      navigate(-1)
    } catch (error) {
      console.log('Error when sign up user')
      console.log(error)
      setShowFailureMessage(true)
    }
  }

  const handleSignIn = async() => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
      navigate(-1)
    } catch (error) {
      console.log('Error when sign in user')
      console.log(error)
      setShowFailureMessage(true)
    }
  }

  return (
    <ContentContainer>
      <Box sx={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Paper sx={{minHeight: '500px', minWidth: '600px'}}>
          <IconButton size='small' sx={{margin: '10px', color: '#2196f3'}} onClick={() => navigate(-1)}>
            <ArrowBackIosIcon/> Back
          </IconButton>
          <Stack direction='column' spacing={4} justifyContent='center' alignItems = 'center' sx={{width: '100%', height: '100%', marginTop: '2%'}}>
            <Stack direction='column' spacing={2} alignItems='center'>
              {signInMode?
                (<>
                  <Typography variant='h4'>
                    Sign In
                  </Typography>
                  <Typography sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: '5px'}}>
                    Sign in with your account or create a new account 
                    <Box style={{color: '#2196f3'}} sx={{ cursor: 'pointer'}} onClick={() => navigate('/signup')}>
                      here
                    </Box>.
                  </Typography>
                </>)
                :
                (<Typography variant='h4'>
                   Sign Up
                 </Typography>)
              }
            </Stack>
            {signInMode? 
              null
              :
              <TextField
                id="displayName-input"
                label="displayName"
                type='text'
                variant="filled"
                error={errorInput['displayName']}
                sx={{width: '80%'}}
                onChange={(e) => {
                  setErrorInput({...errorInput, displayName: false})
                  setDisplayName(e.target.value)}}
              />
            }
            <TextField
              id="email-input"
              label="email"
              type="email"
              autoComplete="current-email"
              variant="filled"
              error={errorInput['email']}
              sx={{width: '80%'}}
              onChange={(e) => {
                setErrorInput({...errorInput, email: false})
                setEmail(e.target.value)}}
            />
            <TextField
              id="password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="filled"
              sx={{width: '80%'}}
              onChange={(e) => {
                setErrorInput({...errorInput, password: false})
                setPassword(e.target.value)}}
              error={errorInput['password']}
            />
            <Stack direction='row' spacing={2}>
              <Button  
                variant='outlined' 
                sx={{color: '#fafafa', borderColor: '#fafafa',width: '185px', height: '45px', ":hover": {borderColor: 'white'}}}
                onClick={() => {
                  let validated = true
                  if(email.trim().length === 0) {
                    setErrorInput({ email: true })
                    validated = false
                  }
                  if(password.trim().length === 0) {
                    setErrorInput((preState) => ({ ...preState, password: true }))
                    validated = false
                  }
                  if (!signInMode) {
                    if(displayName.trim().length === 0) {
                      setErrorInput((preState) => ({ ...preState, displayName: true }))
                      validated = false
                    }
                  }
                  if(signInMode && validated) {
                    handleSignIn()
                  }
                  else if(!signInMode && validated) {
                    handleSignUp()
                  }
                }}
              >
                {signInMode? 'sign in' : 'sign up'}
              </Button>
              {signInMode?
                (<Button onClick={() => {
                  signInWithGoogle()
                  .then(data =>{
                      navigate(-1)
                  })
                  }} 
                  variant='outlined' 
                  sx={{width: '185px'}}
                >
                  sign in with google
                </Button>)
                :
                null
              }
            </Stack>
          </Stack>
        </Paper>
      </Box>
      <Snackbar open={showFailureMessage} autoHideDuration={10000} onClose={() => setShowFailureMessage(false)}>
        <Alert onClose={() => setShowFailureMessage(false)} severity="error" sx={{ width: '100%'}}>
          {signInMode? 'Fail to sign in. Please check your email and password' : 'Fail to create account. Please check if account already exists or try again later.'}
        </Alert>
      </Snackbar>
    </ContentContainer>
  )
} 
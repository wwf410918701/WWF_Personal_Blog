import React, { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { storeEmployerMessage } from "../../firebase/firebase-utils";
import './contact-input-box-styles.scss';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const ContactInputBox = () => {
  const [name, setName] = useState<string>();
  const [email, setemail] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [errorTextFields, setErrorTextField] = useState<{[index: string]: boolean}>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showFailureMessage, setShowFailureMessage] = useState(false) 

  return (<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', rowGap: '10px' }}>
    <TextField className="contactInputField" id="name" label="Name" required error={errorTextFields['name']} helperText={errorTextFields['name']? 'Please input' : null}
      onChange={(e) => {
        setErrorTextField({...errorTextFields, name: false})
        setName(e.target.value)}}
    />
    <TextField className="contactInputField" id="email" label="Email" variant="outlined" required error={errorTextFields['email']} helperText={errorTextFields['email']? 'Please input' : null}
      onChange={(e) => {
        setErrorTextField({...errorTextFields, email: false})
        setemail(e.target.value)}}
    />
    <TextField className="contactInputField" id="message" label="Message" variant="outlined" multiline rows={13} required error={errorTextFields['message']} helperText={errorTextFields['message']? 'Please input' : null}
      onChange={(e) => {
        setErrorTextField({...errorTextFields, message: false})
        setMessage(e.target.value)}}
    />
    <Button variant="contained" onClick={async() => {
      let validated = true
      if (!name || name.trim().length === 0) {
        setErrorTextField({name: true})
        validated = false
      }
      if(!email || email.trim().length === 0) {
        setErrorTextField((preState) => ({...preState, email: true}))
        validated = false
      }
      if (!message || message.trim().length === 0) {
        setErrorTextField((preState) => ({...preState, message: true}))
        validated = false
      }
      if(validated) {
        if(await storeEmployerMessage(name, email, message)) {
          setShowSuccessMessage(true)
        }
        else {
          setShowFailureMessage(true)
        }
      }
      }
    }
    >
      Submit
    </Button>
    <Snackbar open={showSuccessMessage} autoHideDuration={6000} onClose={() => setShowSuccessMessage(false)}>
      <Alert onClose={() => setShowSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
        Hi, I have successfully received your message and will contact you soon! Thanks for your patience.
      </Alert>
    </Snackbar>
    <Snackbar open={showFailureMessage} autoHideDuration={10000} onClose={() => setShowFailureMessage(false)}>
      <Alert onClose={() => setShowFailureMessage(false)} severity="error" sx={{ width: '100%'}}>
        <Box sx={{display: 'flex', alignItems: 'center',flexDirection: 'row' }}>
          <div>
            Opps some errors happened. Please contact me through my LinkedIn 
          </div>
          <div>
            {<LinkedInIcon className="LinkedInIcon" color="primary" sx={{marginLeft: '5px'}} onClick={() => {window.open("https://www.linkedin.com/in/%E4%BC%9F%E9%94%8B-%E5%90%B4-6b829b1a2/?locale=en_US")}}/>}
          </div> 
          <div>
            or email.
          </div>
        </Box>
      </Alert>
    </Snackbar>
  </Box>)
}
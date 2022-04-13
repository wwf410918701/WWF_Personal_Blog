import React, { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import './contact-input-box-styles.scss';
import Button from "@mui/material/Button";

export const ContactInputBox = () => {
  const [name, setName] = useState<string>();
  const [email, setemail] = useState<string>();
  const [message, setMessage] = useState<string>();

  return (<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', rowGap: '10px' }}>
    <TextField className="contactInputField" id="name" label="Name" 
      onChange={(e) => {setName(e.target.value)}}
    />
    <TextField className="contactInputField" id="email" label="Email" variant="outlined" 
      onChange={(e) => {setemail(e.target.value)}}
    />
    <TextField className="contactInputField" id="message" label="Message" variant="outlined" multiline rows={13}
      onChange={(e) => {setMessage(e.target.value)}}
    />
    <Button variant="contained" onClick={() => {
      console.log(name); console.log(email); console.log(message)}}>
      Submit
    </Button>
  </Box>)
}
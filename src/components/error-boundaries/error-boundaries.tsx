import React from "react";

import ErrorShownPic from '../../data/images/errorImage.png';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type ErrorBoundariesProps = {children: JSX.Element | JSX.Element[]}

type ErrorBoundariesState = {
  hasError: boolean,
}

export default class ErrorBoundaries extends React.Component<ErrorBoundariesProps, ErrorBoundariesState> {
  constructor(props: ErrorBoundariesProps) {
    super(props);

    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true
    }
  }

  componentDidCatch(error: any, info: any) {
    console.log("Error catched in error boundaries=>")
    console.log("error=>")
    console.log(error)
    console.log('info=>')
    console.log(info)
  }

  render() {
    if(this.state.hasError) {
      //TODO Add a custom image
      return (
        <Stack justifyContent='center' alignItems='center'  sx={{ width: '100%', height: '100%' }}>
          <img src={ErrorShownPic} alt="web site broke down img" style={{ width: '35%', height: '35%' }}/>
          <Typography variant="h4">
            Sorry, this website is broke down. Please come back and try again later.
          </Typography>
        </Stack>
      )
    }
    return this.props.children
  }
}
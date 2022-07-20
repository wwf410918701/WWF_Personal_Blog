import Container from "@mui/material/Container/Container";
import React from "react";

interface ContentContainerProps {
  children: JSX.Element | JSX.Element[],
  customizedStyles?: Object,
}

export const ContentContainer = ({ children, customizedStyles }: ContentContainerProps) => (
  <Container sx={{ minHeight: '100vh', minWidth: '85%', opacity: '88%',
    paddingBottom: '100px', backgroundColor: '#272727', marginTop: '5%', marginBottom: '5%', borderRadius: '20px', padding: '20px', ...customizedStyles }}>
    {children}
  </Container>
)
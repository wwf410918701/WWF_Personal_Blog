import Container from "@mui/material/Container/Container";
import React from "react";

interface ContentContainerProps {
  children: JSX.Element | JSX.Element[]
}

export const ContentContainer = ({ children }: ContentContainerProps) => (
  <Container sx={{ minHeight: '100vh', minWidth: '85%', paddingBottom: '100px' }}>
    {children}
  </Container>
)
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { main_components_routes } from './router/index';
import { PersonalDetailPage } from './pages/personal-detail-page/personal-detail-page';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';


function App() {
  //获取用户当前系统是否为暗黑模式
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  //根据用户系统是否暗黑模式生成对应的主题
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'dark',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* TODO: 添加drawer */}
      {/* <Drawer anchor='left' open={true}>
        111 
      </Drawer> */}
      <Routes>
        {
          Object.keys(main_components_routes).map(main_route => main_components_routes[main_route])
        }
      </Routes>
    </ThemeProvider>
  );
}

export default App;

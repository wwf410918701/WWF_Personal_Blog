import React, { createContext, Suspense, useContext, useEffect, useRef } from 'react';
import { Routes } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';

import './App.scss';
import { main_components_routes } from './router/root-routers';
import { PersonalDetailPage } from './pages/personal-detail-page/personal-detail-page';
import RootStore from './store/root-store';
import { LeftDrawer } from './components/left-drawer/left-drawer';
import { auth } from './firebase/firebase-utils';
import { action } from 'mobx';
import LoadingPage from './components/loading-page/loading-page';
import ErrorBoundaries from './components/error-boundaries/error-boundaries';
import Box from '@mui/material/Box';
import GlobalBackgroundImg from './data/images/background-img.jpg';

export const RootStoreContext = createContext<RootStore>(new RootStore());


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
    <Box>
      <img src={GlobalBackgroundImg} alt="global-background" style={{width: '100%', height: '100vh', position: 'fixed', top: '0', zIndex: '-1' }}/>
      <RootStoreContext.Provider value={new RootStore()}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LeftDrawer/>
          <ErrorBoundaries>
          <Suspense fallback={<LoadingPage />}>
            <Routes>
                {
                  Object.keys(main_components_routes).map(main_route => main_components_routes[main_route])
                }
            </Routes>
          </Suspense>
          </ErrorBoundaries>
        </ThemeProvider>
      </RootStoreContext.Provider>
    </Box>
  );
}

export default App;

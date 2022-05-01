import React, { createContext, useContext, useEffect, useRef } from 'react';
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
    <RootStoreContext.Provider value={new RootStore()}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LeftDrawer/>
        <Routes>
          {
            Object.keys(main_components_routes).map(main_route => main_components_routes[main_route])
          }
        </Routes>
      </ThemeProvider>
    </RootStoreContext.Provider>
  );
}

export default App;

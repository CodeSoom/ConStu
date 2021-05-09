import React, { useEffect } from 'react';

import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider } from '@emotion/react';

import { getCommon } from './util/utils';
import { loadItem } from './services/storage';
import { setUser } from './reducers/authSlice';

import { lightTheme, darkTheme } from './styles/theme';

import MainPage from './pages/MainPage';
import WritePage from './pages/WritePage';
import GlobalStyles from './styles/GlobalStyles';
import IntroducePage from './pages/IntroducePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HeaderContainer from './containers/base/HeaderContainer';

const App = () => {
  const dispatch = useDispatch();

  const theme = useSelector(getCommon('theme'));
  const user = loadItem('user');

  useEffect(() => {
    if (user) {
      const { email } = user;

      dispatch(setUser(email));
    }
  }, [dispatch, user]);

  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <GlobalStyles />
      <HeaderContainer />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/introduce/:id" component={IntroducePage} />
        <Route component={LoginPage} path="/login" />
        <Route component={RegisterPage} path="/register" />
        <Route path="/write" component={WritePage} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;

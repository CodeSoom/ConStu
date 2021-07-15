import React, { useEffect } from 'react';

import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ThemeProvider } from '@emotion/react';

import useTheme from './hooks/useTheme';

import { loadItem } from './services/storage';
import { setUser } from './reducers/authSlice';

import { lightTheme, darkTheme } from './styles/theme';

import ErrorBoundary from './ErrorBoundary';

import MainPage from './pages/MainPage';
import WritePage from './pages/WritePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import GlobalStyles from './styles/GlobalStyles';
import IntroducePage from './pages/IntroducePage';

const App = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

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
      <ErrorBoundary>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/introduce/:id" component={IntroducePage} />
          <Route path="/write" component={WritePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;

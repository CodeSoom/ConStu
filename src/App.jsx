import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';

import useTheme from './hooks/useTheme';

import { lightTheme, darkTheme } from './styles/theme';

import Core from './components/base/Core';
import ErrorBoundary from './ErrorBoundary';
import PrivateRoute from './components/common/PrivateRoute';

import MainPage from './pages/MainPage';
import WritePage from './pages/WritePage';
import LoginPage from './pages/LoginPage';
import MyInfoPage from './pages/myInfo/MyInfoPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import IntroducePage from './pages/IntroducePage';

const App = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <Core />
      <ErrorBoundary>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/introduce/:id" component={IntroducePage} />
          <PrivateRoute path="/write" component={WritePage} />
          <PrivateRoute exact path={['/myinfo', '/myinfo/:tab(study|setting)']} component={MyInfoPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;

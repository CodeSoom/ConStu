import React from 'react';

import { Switch, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import WritePage from './pages/WritePage';
import IntroducePage from './pages/IntroducePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HeaderContainer from './containers/common/HeaderContainer';

const App = () => (
  <>
    <HeaderContainer />
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/introduce/:id" component={IntroducePage} />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route path="/write" component={WritePage} />
    </Switch>
  </>
);

export default App;

import React from 'react';

import { Switch, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import WritePage from './pages/WritePage';
import IntroducePage from './pages/IntroducePage';
import HeaderContainer from './containers/common/HeaderContainer';

const App = () => (
  <>
    <HeaderContainer />
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/introduce/:id" component={IntroducePage} />
      <Route path="/write" component={WritePage} />
    </Switch>
  </>
);

export default App;

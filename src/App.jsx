import React from 'react';

import { Switch, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import IntroducePage from './pages/IntroducePage';
import HeaderContainer from './containers/common/HeaderContainer';

const App = () => (
  <>
    <HeaderContainer />
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/introduce" component={IntroducePage} />
    </Switch>
  </>
);

export default App;

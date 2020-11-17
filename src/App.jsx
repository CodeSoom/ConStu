import React from 'react';

import { Switch, Route } from 'react-router-dom';

import StudyListPage from './pages/MainPage';
import StudyIntroducePage from './pages/IntroducePage';
import HeaderContainer from './containers/common/HeaderContainer';

const App = () => (
  <>
    <HeaderContainer />
    <Switch>
      <Route exact path="/" component={StudyListPage} />
      <Route path="/introduce" component={StudyIntroducePage} />
    </Switch>
  </>
);

export default App;

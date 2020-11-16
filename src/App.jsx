import React from 'react';

import { Switch, Route } from 'react-router-dom';

import StudyListPage from './pages/StudyListPage';
import HeaderContainer from './containers/common/HeaderContainer';

const App = () => (
  <>
    <HeaderContainer />
    <Switch>
      <Route exact path="/" component={StudyListPage} />
    </Switch>
  </>
);

export default App;

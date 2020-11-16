import React from 'react';

import { Switch, Route } from 'react-router-dom';

import StudyListPage from './pages/StudyListPage';

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={StudyListPage} />
    </Switch>
  </>
);

export default App;

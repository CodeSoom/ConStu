import React from 'react';

import { Helmet } from 'react-helmet';

import AppBlock from '../styles/AppBlock';

import StudyGroupsContainer from '../containers/groups/StudyGroupsContainer';

const MainPage = () => (
  <>
    <Helmet>
      <title>ConStu</title>
    </Helmet>
    <AppBlock>
      <StudyGroupsContainer />
    </AppBlock>
  </>
);

export default React.memo(MainPage);

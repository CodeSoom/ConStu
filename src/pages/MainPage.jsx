import React from 'react';

import { Helmet } from 'react-helmet';

import Responsive from '../styles/Responsive';

import StudyGroupsContainer from '../containers/groups/StudyGroupsContainer';

const MainPage = () => (
  <>
    <Helmet>
      <title>제목(미정)</title>
    </Helmet>
    <Responsive>
      <StudyGroupsContainer />
    </Responsive>
  </>
);

export default React.memo(MainPage);

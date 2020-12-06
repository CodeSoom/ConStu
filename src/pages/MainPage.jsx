import React from 'react';

import Responsive from '../styles/Responsive';

import StudyGroupsContainer from '../containers/groups/StudyGroupsContainer';

const MainPage = () => (
  <Responsive>
    <StudyGroupsContainer />
  </Responsive>
);

export default React.memo(MainPage);

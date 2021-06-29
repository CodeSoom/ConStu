import React from 'react';

import { Helmet } from 'react-helmet';

import GlobalBlock from '../styles/GlobalBlock';

import ThemeToggleContainer from '../containers/base/ThemeToggleContainer';
import StudyGroupsContainer from '../containers/groups/StudyGroupsContainer';

const MainPage = () => (
  <>
    <Helmet>
      <title>ConStu</title>
    </Helmet>
    <GlobalBlock>
      <ThemeToggleContainer />
      <StudyGroupsContainer />
    </GlobalBlock>
  </>
);

export default React.memo(MainPage);

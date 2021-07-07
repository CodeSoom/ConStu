import React from 'react';

import { Helmet } from 'react-helmet';

import GlobalBlock from '../styles/GlobalBlock';

import HeaderContainer from '../containers/base/HeaderContainer';
import ThemeToggleContainer from '../containers/base/ThemeToggleContainer';
import StudyGroupsContainer from '../containers/groups/StudyGroupsContainer';

const MainPage = () => (
  <>
    <Helmet>
      <title>ConStu</title>
    </Helmet>
    <HeaderContainer />
    <GlobalBlock>
      <ThemeToggleContainer />
      <StudyGroupsContainer />
    </GlobalBlock>
  </>
);

export default React.memo(MainPage);

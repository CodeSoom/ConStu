import React from 'react';

import styled from '@emotion/styled';

import StudyGroupsContainer from '../containers/groups/StudyGroupsContainer';
import Responsive from '../styles/Responsive';

const MainPageWrapper = styled(Responsive)`

`;

const MainPage = () => (
  <MainPageWrapper>
    <h2>지금 바로 시작하세요!</h2>
    <StudyGroupsContainer />
  </MainPageWrapper>
);

export default MainPage;

import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { loadStudyGroups } from '../reducers/slice';
import StudyGroupsContainer from '../containers/groups/StudyGroupsContainer';
import Responsive from '../styles/Responsive';

const MainPageWrapper = styled(Responsive)`

`;

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStudyGroups());
  }, []);

  return (
    <MainPageWrapper>
      <h2>지금 바로 시작하세요!</h2>
      <StudyGroupsContainer />
    </MainPageWrapper>
  );
};

export default MainPage;

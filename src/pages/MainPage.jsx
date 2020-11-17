import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { loadStudyGroups } from '../reducers/slice';
import StudyGroupsContainer from '../containers/groups/StudyGroupsContainer';

const MainPageWrapper = styled.div``;

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStudyGroups());
  }, []);

  return (
    <MainPageWrapper>
      <h2>스터디 목록</h2>
      <StudyGroupsContainer />
    </MainPageWrapper>
  );
};

export default MainPage;

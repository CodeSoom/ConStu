import React from 'react';

import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import StudyGroups from '../../components/main/StudyGroups';
import { get } from '../../../utils';

const StudyGroupsContainerBlock = styled.div``;

const StudyGroupsContainer = () => {
  const groups = useSelector(get('groups'));

  if (!groups.length || !groups) {
    return <div>스터디가 존재하지 않습니다.</div>;
  }

  return (
    <StudyGroupsContainerBlock>
      <StudyGroups groups={groups} />
    </StudyGroupsContainerBlock>
  );
};

export default StudyGroupsContainer;

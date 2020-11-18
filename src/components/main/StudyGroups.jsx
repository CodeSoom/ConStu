import React from 'react';

import styled from '@emotion/styled';

import StudyGroup from './StudyGroup';

const StudyGroupsWrapper = styled.div``;

const StudyGroups = ({ groups }) => (
  <StudyGroupsWrapper>
    {groups.map((group) => (
      <StudyGroup
        key={group.id}
        group={group}
      />
    ))}
  </StudyGroupsWrapper>
);

export default StudyGroups;

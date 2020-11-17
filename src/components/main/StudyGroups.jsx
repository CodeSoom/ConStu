import React from 'react';

import styled from '@emotion/styled';

const StudyGroupsWrapper = styled.ul``;

const StudyGroups = ({ groups }) => (
  <StudyGroupsWrapper>
    {groups.map((group) => (
      <li key={group.id}>{group.title}</li>
    ))}
  </StudyGroupsWrapper>
);

export default StudyGroups;

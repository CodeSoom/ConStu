import React from 'react';

import styled from '@emotion/styled';

import StudyGroup from './StudyGroup';
import Button from '../../styles/Button';

const StudyGroupsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const TitleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StudyGroups = ({ groups, realTime, user }) => (
  <>
    <TitleHeader>
      <h2>지금 바로 시작하세요!</h2>
      {user && (
        <Button
          to="/write"
        >
          스터디 개설하기
        </Button>
      )}
    </TitleHeader>
    <StudyGroupsWrapper>
      {groups && groups.map((group) => (
        <StudyGroup
          key={group.id}
          group={group}
          realTime={realTime}
        />
      ))}
    </StudyGroupsWrapper>
  </>
);

export default React.memo(StudyGroups);

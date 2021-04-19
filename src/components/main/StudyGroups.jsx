import React from 'react';

import _ from 'lodash';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';

import StudyGroup from './StudyGroup';
import Button from '../../styles/Button';

const StudyGroupsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const headerSize = mq({
  fontSize: ['1.3rem', '1.5rem', '1.7rem'],
});

const TitleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-weight: inherit;
    ${headerSize}
  }
`;

const StudyGroups = ({ groups, realTime, user }) => (
  <>
    <TitleHeader>
      <h2>스터디를 직접 개설하거나 참여해보세요!</h2>
      {user && (
        <Button
          to="/write"
          style={{ padding: '0.6rem 1rem' }}
        >
          스터디 개설하기
        </Button>
      )}
    </TitleHeader>
    <StudyGroupsWrapper>
      {!_.isEmpty(groups) && groups.map((group) => (
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

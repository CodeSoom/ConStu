import React from 'react';

import _ from 'lodash';

import styled from '@emotion/styled';

import { STUDY_GROUPS_TITLE } from '../../util/constants/constants';

import StudyGroup from './StudyGroup';
import Button from '../../styles/Button';

const { HEADER, OPEN_STUDY } = STUDY_GROUPS_TITLE;

const StudyGroupsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const TitleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StudyGroups = ({ groups, realTime, user }) => (
  <>
    <TitleHeader>
      <h2>{HEADER}</h2>
      {user && (
        <Button
          to="/write"
        >
          {OPEN_STUDY}
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

import React from 'react';

import _ from 'lodash';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useMediaQuery } from 'react-responsive';

import mq from '../../styles/responsive';

import StudyGroup from './StudyGroup';
import EstablishStudy from './EstablishStudy';

const StudyGroupsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 2rem 0;

  ${({ isMobile }) => isMobile && css`
    margin: 1rem 0;
  `};
`;

const headerSize = mq({
  fontSize: ['1.3rem', '1.5rem', '1.7rem'],
});

const TitleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ isMobile }) => isMobile && css`
    flex-direction: column;

    .plus-icon {
      margin-top: 1.5rem;
    }
  `};

  h2 {
    font-weight: inherit;
    margin-bottom: .5rem;
    ${headerSize}
  }
`;

const StudyGroups = ({ groups, realTime, user }) => {
  const isMobileScreen = useMediaQuery({ query: '(max-width: 450px)' });

  return (
    <>
      <TitleHeader isMobile={isMobileScreen}>
        <h2>스터디를 직접 개설하거나 참여해보세요!</h2>
        {user && (
          <EstablishStudy isMobile={isMobileScreen} />
        )}
      </TitleHeader>
      <StudyGroupsWrapper isMobile={isMobileScreen}>
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
};

export default React.memo(StudyGroups);

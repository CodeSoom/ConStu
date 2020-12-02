import React from 'react';

import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import palette from '../../styles/palette';

import StudyGroup from './StudyGroup';

const StudyGroupsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-between;
`;

const TitleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // TODO: Link 공통 style component 만들기
  a {
    margin-right: 4rem;
    padding: .6rem .9rem .6rem .9rem;
    border: 1px solid ${palette.gray[7]};
    background: white;
    color: ${palette.gray[7]};
    font-weight: bold;
    border-radius: .7rem;
    :hover {
      color: white;
      background: ${palette.gray[7]};
    }
  }
`;

const StudyGroups = ({ groups, realTime, user }) => (
  <>
    <TitleHeader>
      <h2>지금 바로 시작하세요!</h2>
      {user && (
        <Link to="/write">스터디 개설하기</Link>
      )}
    </TitleHeader>
    <StudyGroupsWrapper>
      {groups.map((group) => (
        <StudyGroup
          key={group.id}
          group={group}
          realTime={realTime}
        />
      ))}
    </StudyGroupsWrapper>
  </>
);

export default StudyGroups;

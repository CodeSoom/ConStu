import React from 'react';

import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import Tags from '../common/Tags';
import palette from '../../styles/palette';

const StudyGroupWrapper = styled.div`
  margin: 1em .5em 1em .5em;
  padding: 2em 0 1em 1em;
  width: 28%;
  border: 2px solid ${palette.gray[4]};
  border-radius: 1rem;
`;

const HeaderLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 500;
  font-family: 'Nanum Pen Script', cursive;
  &:hover {
    color: ${palette.gray[6]};
  }
`;

const StudyInfoWrapper = styled.div`
  margin: 1rem 0 1rem 0;
  .moderator{
    margin-bottom: 1rem;
    color: ${palette.gray[5]};
    font-weight: bold;
  }
`;

const DateTimeChange = styled.div`
  margin-left: 1.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  font-family: 'Gamja Flower', cursive;
  padding: .1rem .5rem .1rem .5rem;
  display: inline-flex;
  color: white;
  border-radius: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background: ${palette.cyan[4]};
`;

const StudyGroup = ({ group }) => {
  const {
    id, moderatorId, title, personnel, applyEndDate, tags, participants,
  } = group;

  return (
    <StudyGroupWrapper>
      <HeaderLink to={`/introduce/${id}`}>
        {title}
      </HeaderLink>
      <StudyInfoWrapper>
        <div className="moderator">{moderatorId}</div>
        <div>
          {`모집 인원: ${participants.length} / ${personnel}`}
          <DateTimeChange>모집중</DateTimeChange>
        </div>
        <div>
          {`마감 일자: ${applyEndDate}`}
        </div>
        <Tags tags={tags} />
      </StudyInfoWrapper>
    </StudyGroupWrapper>
  );
};

export default StudyGroup;

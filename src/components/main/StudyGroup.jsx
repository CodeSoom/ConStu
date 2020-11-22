import React from 'react';

import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import Moment from 'react-moment';

import Tags from '../common/Tags';
import palette from '../../styles/palette';
import DateTimeChange from '../common/DateTimeChange';

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

const StudyGroup = ({ group }) => {
  const {
    id, moderatorId, title, applyEndDate, tags,
  } = group;

  const applyEndTime = new Date(applyEndDate);

  return (
    <StudyGroupWrapper>
      <HeaderLink to={`/introduce/${id}`}>
        {title}
      </HeaderLink>
      <StudyInfoWrapper>
        <div className="moderator">{moderatorId}</div>
        <div>
          <DateTimeChange
            group={group}
            page="main"
          />
        </div>
        <div>
          {'마감 일자: '}
          <Moment interval={0} format="YYYY년 MM월 DD일">{applyEndTime}</Moment>
        </div>
        <Tags tags={tags} />
      </StudyInfoWrapper>
    </StudyGroupWrapper>
  );
};

export default StudyGroup;

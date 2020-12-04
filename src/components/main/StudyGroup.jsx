import React from 'react';

import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import Moment from 'react-moment';

import Tags from '../common/Tags';
import palette from '../../styles/palette';
import DateTimeChange from '../common/DateTimeChange';

const StudyGroupWrapper = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  width: 19rem;
  margin: 1rem;
  border: 2px solid ${palette.gray[4]};
  border-radius: 4px;
  background: rgb(248, 249, 250);
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
`;

const HeaderLink = styled(Link)`
  display: flex;
  justify-content: center;
  padding: 1.4rem 0 0.8rem 0;
  font-size: 2.3rem;
  font-weight: 500;
  font-family: 'Nanum Pen Script', cursive;
  &:hover {
    color: ${palette.gray[6]};
  }
`;

const StudyInfoWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  .moderator{
    margin-bottom: 1rem;
    color: ${palette.gray[5]};
    font-weight: bold;
  }
`;

const ApplyEndDateWrapper = styled.div`
  padding-bottom: 2rem;
  border: 50%;
  border-bottom: 1px solid ${palette.gray[4]}; 

`;

const StudyGroup = ({ group, realTime }) => {
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
            time={realTime}
          />
        </div>
        <ApplyEndDateWrapper>
          {'마감 일자: '}
          <Moment interval={0} format="YYYY년 MM월 DD일">{applyEndTime}</Moment>
        </ApplyEndDateWrapper>
        <Tags tags={tags} />
      </StudyInfoWrapper>
    </StudyGroupWrapper>
  );
};

export default StudyGroup;

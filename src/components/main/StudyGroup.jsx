import React from 'react';
import { Link } from 'react-router-dom';

import styled from '@emotion/styled';
import Tags from '../common/Tags';

const StudyGroupWrapper = styled.div``;

const HeaderLink = styled(Link)`
  font-size: 1.5em;
  margin-bottom: 0;
  margin-top: 0;
  font-weight: bold;
  &:hover {
    color: gray;
  }
`;

const StudyGroup = ({ group }) => {
  const {
    id, moderatorId, title, personnel, applyEndDate, applyStartDate, tags,
  } = group;

  return (
    <StudyGroupWrapper>
      <HeaderLink to={`/introduce/${id}`}>
        {title}
      </HeaderLink>
      <div>
        <small>{moderatorId}</small>
        <div>{`참여 인원: ${personnel}`}</div>
        <div>
          <label htmlFor="applyDate">신청 기간</label>
          <div>{`${applyStartDate} ~ ${applyEndDate}`}</div>
        </div>
        <Tags tags={tags} />
      </div>
    </StudyGroupWrapper>
  );
};

export default StudyGroup;

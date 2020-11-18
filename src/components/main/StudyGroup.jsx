import React from 'react';

import styled from '@emotion/styled';
import Tags from '../common/Tags';

const StudyGroupWrapper = styled.div``;

const StudyGroup = ({ group }) => {
  const {
    moderatorId, title, personnel, applyEndDate, applyStartDate, tags,
  } = group;

  return (
    <StudyGroupWrapper>
      <h3>{title}</h3>
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

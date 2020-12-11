import React from 'react';

import styled from '@emotion/styled';

import ParticipantListButton from '../../../styles/ParticipantListButton';

const ParticipantListWrapper = styled.div`
  display: grid;
  grid-template-columns: 260px 186px 148px;
  justify-items: center;
  align-items: center;
  margin-bottom: 0.5rem;
  min-height: 0;
  min-width: 0;
`;

const ParticipantList = ({ id, confirm }) => (
  <ParticipantListWrapper>
    <div>{id}</div>
    <div>
      <ParticipantListButton sky>
        신청서 보기
      </ParticipantListButton>
    </div>
    <div>
      {confirm === true ? (
        <ParticipantListButton cancel>
          취소하기
        </ParticipantListButton>
      ) : (
        <ParticipantListButton confirm>
          승인하기
        </ParticipantListButton>
      )}
    </div>
  </ParticipantListWrapper>
);

export default ParticipantList;

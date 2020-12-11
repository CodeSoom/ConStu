import React, { useState } from 'react';

import styled from '@emotion/styled';

import ParticipantListButton from '../../../styles/ParticipantListButton';
import ApplicationViewModal from './ApplicationViewModal';

const ParticipantListWrapper = styled.div`
  display: grid;
  grid-template-columns: 260px 186px 148px;
  justify-items: center;
  align-items: center;
  margin-bottom: 0.7rem;
  min-height: 0;
  min-width: 0;
`;

const ParticipantList = ({ participant, onUpdate }) => {
  const [viewApplyModal, setViewApplyModal] = useState(false);

  const { id, confirm } = participant;

  const handleApplyFormClick = () => {
    setViewApplyModal(true);
  };

  const handelApplyFormClose = () => {
    setViewApplyModal(false);
  };

  return (
    <>
      <ParticipantListWrapper>
        <div>{id}</div>
        <div>
          <ParticipantListButton
            sky
            onClick={handleApplyFormClick}
          >
            신청서 보기
          </ParticipantListButton>
        </div>
        <div>
          {confirm === true ? (
            <ParticipantListButton
              cancel
              onClick={onUpdate}
            >
              취소하기
            </ParticipantListButton>
          ) : (
            <ParticipantListButton
              confirm
              onClick={onUpdate}
            >
              승인하기
            </ParticipantListButton>
          )}
        </div>
      </ParticipantListWrapper>
      <ApplicationViewModal
        visible={viewApplyModal}
        onClose={handelApplyFormClose}
        participant={participant}
      />
    </>
  );
};

export default ParticipantList;

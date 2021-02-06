import React, { useState } from 'react';

import styled from '@emotion/styled';

import { PARTICIPANT_FORM } from '../../../util/constants/constants';

import ApplicationViewModal from './ApplicationViewModal';
import ParticipantListButton from '../../../styles/ParticipantListButton';

const { VIEW_APPLICATION, CONFIRM, CANCEL } = PARTICIPANT_FORM;

const ParticipantListWrapper = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 260px 186px 148px;
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
            {VIEW_APPLICATION}
          </ParticipantListButton>
        </div>
        <div>
          {confirm === true ? (
            <ParticipantListButton
              cancel
              onClick={onUpdate}
            >
              {CANCEL}
            </ParticipantListButton>
          ) : (
            <ParticipantListButton
              confirm
              onClick={onUpdate}
            >
              {CONFIRM}
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

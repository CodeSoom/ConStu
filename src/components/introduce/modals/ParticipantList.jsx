import React, { useState } from 'react';

import styled from '@emotion/styled';

import { PARTICIPANT_FORM } from '../../../util/constants/constants';

import mq from '../../../styles/responsive';

import ApplicationViewModal from './ApplicationViewModal';
import ParticipantListButton from '../../../styles/ParticipantListButton';

const { VIEW_APPLICATION, CONFIRM, CANCEL } = PARTICIPANT_FORM;

const ParticipantListWrapper = styled.div`
  ${mq({
    display: ['grid', 'flex', 'grid'],
    gridTemplateColumns: ['220px 100px 100px', 'unset', '260px 186px 148px'],
  })};

  width: 100%;
  text-align:center;
  justify-items: center;
  align-items: center;
  margin-bottom: 0.7rem;
  min-height: 0;
  min-width: 0;

  .participant-email {
  ${mq({
    width: ['100%', '50%', '100%'],
  })};

    font-family: 'Nanum Gothic', sans-serif;
    font-size: .9rem;
    line-height: 1.2;
    overflow-wrap: break-word;
    word-break: keep-all;
    text-align: center;
  }

  .application-view {
  ${mq({
    margin: [0, '0 1rem', 0],
    width: ['100%', '30%', 'auto'],
  })};
  }

  .confirm {
  ${mq({
    width: ['100%', '20%', 'auto'],
  })};
  }
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
        <div className="participant-email">
          {id}
        </div>
        <div className="application-view">
          <ParticipantListButton
            sky
            onClick={handleApplyFormClick}
          >
            {VIEW_APPLICATION}
          </ParticipantListButton>
        </div>
        <div className="confirm">
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

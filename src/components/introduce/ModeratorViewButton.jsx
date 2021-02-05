import React, { useState } from 'react';

import styled from '@emotion/styled';

import { changeDateToTime, isCheckedOnlyTimeStatus } from '../../util/utils';

import { MODERATOR_STATUS } from '../../util/constants/constants';

import ApproveStatus from '../../styles/ApproveStatus';
import ParticipantListModal from './modals/ParticipantListModal';
import StyledApplyStatusButton from '../../styles/StyledApplyStatusButton';

const { CONDUCT_STUDY, CONFIRM_STUDY } = MODERATOR_STATUS;

const OrganizerStatus = styled.div`
  display: flex;
  flex-direction: row;
`;

const organizerRemove = (applicant) => applicant.filter((_, index) => index !== 0);

const approveParticipantsNumber = (approveUsers) => organizerRemove(approveUsers)
  .filter(({ confirm }) => confirm === false)
  .length;

const ModeratorViewButton = ({
  group, user, onUpdateConfirm, realTime,
}) => {
  const [ListModal, setListModal] = useState(false);

  const { moderatorId, participants, applyEndDate } = group;

  const applyEndTime = changeDateToTime(applyEndDate);

  const approveUsersCount = approveParticipantsNumber(participants);

  const checkTime = {
    time: realTime,
    applyEndTime,
  };

  const handleClick = () => {
    setListModal(true);
  };

  const handelClose = () => {
    setListModal(false);
  };

  if (moderatorId !== user) {
    return null;
  }

  if (isCheckedOnlyTimeStatus(checkTime)) {
    return (
      <StyledApplyStatusButton
        type="button"
        className="apply-complete"
      >
        {CONDUCT_STUDY}
      </StyledApplyStatusButton>
    );
  }

  return (
    <>
      <OrganizerStatus>
        {approveUsersCount !== 0 && (
          <ApproveStatus wait>
            {`${approveUsersCount}명이 승인을 기다리고 있습니다!`}
          </ApproveStatus>
        )}
        <StyledApplyStatusButton
          type="button"
          className="confirm"
          onClick={handleClick}
        >
          {CONFIRM_STUDY}
        </StyledApplyStatusButton>
      </OrganizerStatus>
      <ParticipantListModal
        visible={ListModal}
        onClose={handelClose}
        onUpdate={onUpdateConfirm}
        participants={organizerRemove(participants)}
      />
    </>
  );
};

export default React.memo(ModeratorViewButton);

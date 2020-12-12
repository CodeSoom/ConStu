import React, { useState } from 'react';

import { changeDateToTime, isCheckedOnlyTimeStatus } from '../../util/utils';

import ParticipantListModal from './modals/ParticipantListModal';
import StyledApplyStatusButton from '../../styles/StyledApplyStatusButton';

const ModeratorViewButton = ({
  group, user, onUpdateConfirm, realTime,
}) => {
  const [ListModal, setListModal] = useState(false);

  const { moderatorId, participants, applyEndDate } = group;

  const applyEndTime = changeDateToTime(applyEndDate);

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
        스터디를 진행해주세요!
      </StyledApplyStatusButton>
    );
  }

  return (
    <>
      <StyledApplyStatusButton
        type="button"
        className="confirm"
        onClick={handleClick}
      >
        스터디 참여 승인하기
      </StyledApplyStatusButton>
      <ParticipantListModal
        visible={ListModal}
        onClose={handelClose}
        onUpdate={onUpdateConfirm}
        participants={participants.filter((_, index) => index !== 0)}
      />
    </>
  );
};

export default React.memo(ModeratorViewButton);

import React, { useState } from 'react';

import StyledApplyStatusButton from '../../styles/StyledApplyStatusButton';
import ParticipantListModal from './modals/ParticipantListModal';

const ModeratorViewButton = ({ group, user, onUpdateConfirm }) => {
  const [ListModal, setListModal] = useState(false);

  const { moderatorId, participants } = group;

  const handleClick = () => {
    setListModal(true);
  };

  const handelClose = () => {
    setListModal(false);
  };

  if (moderatorId !== user) {
    return null;
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

export default ModeratorViewButton;

import React from 'react';

import StyledApplyStatusButton from '../../styles/StyledApplyStatusButton';

const ModeratorViewButton = ({ group, user }) => {
  const { moderatorId } = group;

  if (moderatorId !== user) {
    return null;
  }

  return (
    <>
      <StyledApplyStatusButton
        type="button"
        className="confirm"
      >
        스터디 참여 승인하기
      </StyledApplyStatusButton>
    </>
  );
};

export default ModeratorViewButton;

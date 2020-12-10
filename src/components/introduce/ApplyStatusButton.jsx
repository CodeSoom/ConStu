import React from 'react';

import StyledApplyStatusButton from '../../styles/StyledApplyStatusButton';

const ApplyStatusButton = ({
  timeStatus, onApply, applyStatus, onCancel,
}) => {
  if (!timeStatus && applyStatus) {
    return (
      <StyledApplyStatusButton
        type="button"
        className="apply-cancel"
        onClick={onCancel}
      >
        신청 취소
      </StyledApplyStatusButton>
    );
  }

  if (applyStatus) {
    return (
      <StyledApplyStatusButton
        type="button"
        className="apply-complete"
      >
        신청 완료
      </StyledApplyStatusButton>
    );
  }

  if (timeStatus) {
    return (
      <StyledApplyStatusButton
        type="button"
        className="deadline"
      >
        모집 마감
      </StyledApplyStatusButton>
    );
  }

  return (
    <StyledApplyStatusButton
      type="button"
      className="apply"
      onClick={onApply}
    >
      신청하기
    </StyledApplyStatusButton>
  );
};

export default React.memo(ApplyStatusButton);

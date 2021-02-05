import React from 'react';

import { APPLY_STATUS } from '../../util/constants/constants';

import ApproveStatus from '../../styles/ApproveStatus';
import StyledApplyStatusButton from '../../styles/StyledApplyStatusButton';

const {
  DEAD_LINE, WAIT, APPLY, CANCEL, CONFIRM, REJECT, COMPLETE,
} = APPLY_STATUS;

const checkConfirm = (user) => user.confirm && (user.confirm === true);

const ApplyStatusButton = ({
  timeStatus, onApply, userStatus, onCancel,
}) => {
  if (!timeStatus && !userStatus) {
    return (
      <StyledApplyStatusButton
        type="button"
        className="apply"
        onClick={onApply}
      >
        {APPLY}
      </StyledApplyStatusButton>
    );
  }

  if (timeStatus && !userStatus) {
    return (
      <StyledApplyStatusButton
        type="button"
        className="deadline"
      >
        {DEAD_LINE}
      </StyledApplyStatusButton>
    );
  }

  if (!timeStatus && !checkConfirm(userStatus)) {
    return (
      <>
        <ApproveStatus load>
          {WAIT}
        </ApproveStatus>
        <StyledApplyStatusButton
          type="button"
          className="apply-cancel"
          onClick={onCancel}
        >
          {CANCEL}
        </StyledApplyStatusButton>
      </>
    );
  }

  if (!timeStatus && checkConfirm(userStatus)) {
    return (
      <>
        <ApproveStatus approve>
          {CONFIRM}
        </ApproveStatus>
        <StyledApplyStatusButton
          type="button"
          className="apply-cancel"
          onClick={onCancel}
        >
          {CANCEL}
        </StyledApplyStatusButton>
      </>
    );
  }

  if (timeStatus && !checkConfirm(userStatus)) {
    return (
      <StyledApplyStatusButton
        type="button"
        className="apply-reject"
      >
        {REJECT}
      </StyledApplyStatusButton>
    );
  }

  return (
    <StyledApplyStatusButton
      type="button"
      className="apply-complete"
    >
      {COMPLETE}
    </StyledApplyStatusButton>
  );
};

export default React.memo(ApplyStatusButton);

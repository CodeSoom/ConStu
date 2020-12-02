import React from 'react';

import styled from '@emotion/styled';

const ApplyStatusButtonWrapper = styled.button``;

const ApplyStatusButton = ({
  timeStatus, onApply, user, applyStatus,
}) => {
  if (applyStatus) {
    return (
      <ApplyStatusButtonWrapper
        type="button"
        className="deadline"
      >
        신청 완료
      </ApplyStatusButtonWrapper>
    );
  }

  if (timeStatus) {
    return (
      <ApplyStatusButtonWrapper
        type="button"
        className="deadline"
      >
        모집 마감
      </ApplyStatusButtonWrapper>
    );
  }

  if (!user) {
    return (
      <ApplyStatusButtonWrapper
        type="button"
        className="deadline"
      >
        로그인 후 신청 가능합니다.
      </ApplyStatusButtonWrapper>
    );
  }

  return (
    <ApplyStatusButtonWrapper
      type="button"
      className="apply"
      onClick={onApply}
    >
      신청하기
    </ApplyStatusButtonWrapper>
  );
};

export default ApplyStatusButton;

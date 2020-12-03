import React from 'react';

import styled from '@emotion/styled';

import palette from '../../styles/palette';

const ApplyStatusButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  margin: .5rem 0 .5rem 0;
  padding: 0.25rem 5rem;
  font-size: 1.5em;
  line-height: 0;
  font-family: 'Gamja Flower', cursive;
  border-radius: 0.4rem;
  border: none;
  outline: none;

  &.deadline {
    cursor: not-allowed;
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
  }

  &.apply-complete {
    background: ${palette.gray[1]};
    border: 2px solid #a5d8ff;
    color: #74c0fc;
  }

  &.apply {
    color: white;
    cursor: pointer;
    background: ${palette.teal[5]};
    &:hover{
      background: ${palette.teal[4]};
    }
  }

  &.no-login{
    cursor: not-allowed;
    color: ${palette.gray[5]};
  }
`;

const ApplyStatusButton = ({
  timeStatus, onApply, user, applyStatus,
}) => {
  if (applyStatus) {
    return (
      <ApplyStatusButtonWrapper
        type="button"
        className="apply-complete"
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
        className="no-login"
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

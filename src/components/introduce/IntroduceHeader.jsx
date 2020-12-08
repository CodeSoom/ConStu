import React, { useState } from 'react';

import styled from '@emotion/styled';

import palette from '../../styles/palette';
import { changeDateToTime, isCheckedTimeStatus } from '../../util/utils';

import ApplyStatusButton from './ApplyStatusButton';
import AskLoginModal from './modals/AskLoginModal';
import AskApplyCancelModal from './modals/AskApplyCancelModal';

const IntroduceHeaderWrapper = styled.div`
  border-bottom: 2px solid ${palette.gray[4]};
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 2.3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const IntroduceHeader = ({
  group, onApply, user, realTime, onApplyCancel,
}) => {
  const [loginCheckModal, setLoginCheckModal] = useState(false);
  const [applyCancelModal, setApplyCancelModal] = useState(false);

  const {
    title, moderatorId, participants, applyEndDate,
  } = group;

  const applyEndTime = changeDateToTime(applyEndDate);

  const handleApplyCancelConfirmClick = () => {
    setApplyCancelModal(true);
  };

  const handleLoginCheckCancel = () => {
    setLoginCheckModal(false);
  };

  const handleApplyCancel = () => {
    setApplyCancelModal(false);
  };

  const handleApplyCancelConfirm = () => {
    setApplyCancelModal(false);
    onApplyCancel();
  };

  const handleApply = () => {
    if (!user) {
      setLoginCheckModal(true);
      return;
    }

    onApply();
  };

  return (
    <IntroduceHeaderWrapper>
      <h1>{title}</h1>
      {moderatorId !== user && (
        <>
          <ApplyStatusButton
            user={user}
            onApply={handleApply}
            onCancel={handleApplyCancelConfirmClick}
            applyStatus={participants.includes(user)}
            timeStatus={isCheckedTimeStatus({ ...group, time: realTime, applyEndTime })}
          />
          <AskLoginModal
            visible={loginCheckModal}
            onCancel={handleLoginCheckCancel}
          />
          <AskApplyCancelModal
            visible={applyCancelModal}
            onCancel={handleApplyCancel}
            onConfirm={handleApplyCancelConfirm}
          />
        </>
      )}
    </IntroduceHeaderWrapper>
  );
};

export default IntroduceHeader;
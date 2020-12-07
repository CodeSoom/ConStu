import React, { useState } from 'react';

import styled from '@emotion/styled';

import palette from '../../styles/palette';
import { changeDateToTime, isCheckedTimeStatus } from '../../util/utils';

import ApplyStatusButton from './ApplyStatusButton';
import AskLoginModal from './modals/AskLoginModal';

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
  group, onApply, user, realTime,
}) => {
  const [modal, setModal] = useState(false);

  const {
    title, moderatorId, participants, applyEndDate,
  } = group;

  const applyEndTime = changeDateToTime(applyEndDate);

  const onApplyClick = () => {
    setModal(true);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const handleApply = () => {
    if (!user) {
      onApplyClick();
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
            applyStatus={participants.includes(user)}
            timeStatus={isCheckedTimeStatus({ ...group, time: realTime, applyEndTime })}
          />
          <AskLoginModal visible={modal} onCancel={handleCancel} />
        </>
      )}
    </IntroduceHeaderWrapper>
  );
};

export default IntroduceHeader;

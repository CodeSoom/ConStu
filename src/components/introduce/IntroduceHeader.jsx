import React, { useState } from 'react';

import styled from '@emotion/styled';

import palette from '../../styles/palette';
import { changeDateToTime, isCheckedTimeStatus } from '../../util/utils';

import ApplyStatusButton from './ApplyStatusButton';
import AskLoginModal from './modals/AskLoginModal';
import AskApplyCancelModal from './modals/AskApplyCancelModal';
import ApplicationFormModal from './modals/ApplicationFormModal';

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
  group, onApply, user, realTime, onApplyCancel, onChangeApplyFields, applyFields,
}) => {
  const [loginCheckModal, setLoginCheckModal] = useState(false);
  const [applyCancelModal, setApplyCancelModal] = useState(false);
  const [modalForm, setModalForm] = useState(false);

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

    setModalForm(true);
  };

  const handleFormSubmit = () => {
    setModalForm(false);
    onApply(applyFields);
  };

  const handleFormCancel = () => {
    setModalForm(false);
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
            applyStatus={participants.some(({ id }) => id === user)}
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
          <ApplicationFormModal
            visible={modalForm}
            onCancel={handleFormCancel}
            onConfirm={handleFormSubmit}
            onChangeApply={onChangeApplyFields}
            fields={applyFields}
          />
        </>
      )}
    </IntroduceHeaderWrapper>
  );
};

export default IntroduceHeader;

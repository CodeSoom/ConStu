import React, { useState } from 'react';

import styled from '@emotion/styled';

import { changeDateToTime, isCheckedTimeStatus } from '../../util/utils';

import ApplyStatusButton from './ApplyStatusButton';
import ApplicationFormModal from './modals/ApplicationFormModal';
import AskApplyCancelModal from './modals/AskApplyCancelModal';
import AskLoginModal from './modals/AskLoginModal';

const ParticipantsStatus = styled.div`
  display: flex;
  flex-direction: row;
`;

const ApplicantViewButton = ({
  group, onApply, user, realTime, onApplyCancel, onChangeApplyFields, applyFields, clearForm,
}) => {
  const [loginCheckModal, setLoginCheckModal] = useState(false);
  const [applyCancelModal, setApplyCancelModal] = useState(false);
  const [modalForm, setModalForm] = useState(false);

  const { moderatorId, participants, applyEndDate } = group;

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
    clearForm();
  };

  const isCheckedUserStatus = (applicant) => (userEmail) => applicant
    .find(({ id }) => id === userEmail);

  const status = {
    ...group,
    time: realTime,
    applyEndTime,
  };

  if (moderatorId === user) {
    return null;
  }

  return (
    <>
      <ParticipantsStatus>
        <ApplyStatusButton
          user={user}
          onApply={handleApply}
          onCancel={handleApplyCancelConfirmClick}
          userStatus={isCheckedUserStatus(participants)(user)}
          // FIXME - 수정 필요 isCheckedTimeStatus
          timeStatus={isCheckedTimeStatus(status)}
        />
      </ParticipantsStatus>
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
  );
};

export default ApplicantViewButton;

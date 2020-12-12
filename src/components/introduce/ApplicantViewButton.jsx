import React, { useState } from 'react';

import { changeDateToTime, isCheckedTimeStatus } from '../../util/utils';

import ApplyStatusButton from './ApplyStatusButton';
import ApplicationFormModal from './modals/ApplicationFormModal';
import AskApplyCancelModal from './modals/AskApplyCancelModal';
import AskLoginModal from './modals/AskLoginModal';

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

  if (moderatorId === user) {
    return null;
  }

  return (
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
  );
};

export default ApplicantViewButton;

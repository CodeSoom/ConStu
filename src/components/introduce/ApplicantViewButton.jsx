import React, { useState } from 'react';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';

import { changeDateToTime, isCheckedTimeStatus } from '../../util/utils';

import AskLoginModal from './modals/AskLoginModal';
import ApplyStatusButton from './ApplyStatusButton';
import AskApplyCancelModal from './modals/AskApplyCancelModal';
import ApplicationFormModal from './modals/ApplicationFormModal';

const ParticipantsStatus = styled.div`
  ${mq({
    flexDirection: ['row', 'column', 'column', 'row'],
    alignItems: ['center', 'flex-end', 'flex-end', 'unset'],
    width: ['100%', 'unset'],
    justifyContent: ['space-between', 'unset'],
    marginTop: ['1.5rem', '0rem'],
  })};

  display: flex;
`;

const ApplicantViewButton = ({
  group, user, realTime, onApply, onApplyCancel,
}) => {
  const [modalForm, setModalForm] = useState(false);
  const [loginCheckModal, setLoginCheckModal] = useState(false);
  const [applyCancelModal, setApplyCancelModal] = useState(false);

  const { moderatorId, participants, applyEndDate } = group;

  const applyEndTime = changeDateToTime(applyEndDate);

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

  const handleApplicationSubmit = (formData) => {
    setModalForm(false);
    onApply(formData);
  };

  const isCheckedUserStatus = (applicant, userEmail) => applicant
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
          onCancel={() => setApplyCancelModal(true)}
          userStatus={isCheckedUserStatus(participants, user)}
          timeStatus={isCheckedTimeStatus(status)}
        />
      </ParticipantsStatus>
      <AskLoginModal
        visible={loginCheckModal}
        onCancel={() => setLoginCheckModal(false)}
      />
      <AskApplyCancelModal
        visible={applyCancelModal}
        onCancel={() => setApplyCancelModal(true)}
        onConfirm={handleApplyCancelConfirm}
      />
      <ApplicationFormModal
        visible={modalForm}
        onCancel={() => setModalForm(false)}
        onSubmit={handleApplicationSubmit}
      />
    </>
  );
};

export default ApplicantViewButton;

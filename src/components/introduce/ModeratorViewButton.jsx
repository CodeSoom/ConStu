import React, { useState } from 'react';

import styled from '@emotion/styled';

import { useMediaQuery } from 'react-responsive';

import mq from '../../styles/responsive';
import { changeDateToTime, isCheckedOnlyTimeStatus } from '../../util/utils';

import ApproveStatus from '../../styles/ApproveStatus';
import ParticipantListModal from './modals/ParticipantListModal';
import StyledApplyStatusButton from '../../styles/StyledApplyStatusButton';

const OrganizerStatus = styled.div`
  ${mq({
    width: ['100%', 'unset'],
    marginTop: ['1.5rem', 0],
    flexDirection: ['row', 'column', 'column', 'row'],
    alignItems: ['center', 'flex-end', 'flex-end', 'unset'],
    justifyContent: ['space-between', 'unset'],
  })};
  
  display: flex;
`;

const organizerRemove = (applicant) => applicant.filter((_, index) => index !== 0);

const approveParticipantsNumber = (approveUsers) => organizerRemove(approveUsers)
  .filter(({ confirm }) => confirm === false)
  .length;

const ModeratorViewButton = ({
  group, user, onUpdateConfirm, realTime,
}) => {
  const isMobileScreen = useMediaQuery({ query: '(max-width: 450px)' });

  const [ListModal, setListModal] = useState(false);

  const { moderatorId, participants, applyEndDate } = group;

  const applyEndTime = changeDateToTime(applyEndDate);

  const approveUsersCount = approveParticipantsNumber(participants);

  const checkTime = {
    time: realTime,
    applyEndTime,
  };

  const handleClick = () => {
    setListModal(true);
  };

  const handelClose = () => {
    setListModal(false);
  };

  if (moderatorId !== user) {
    return null;
  }

  if (isCheckedOnlyTimeStatus(checkTime)) {
    return (
      <OrganizerStatus>
        <div />
        <StyledApplyStatusButton
          type="button"
          className="apply-complete"
        >
          스터디를 진행해주세요!
        </StyledApplyStatusButton>
      </OrganizerStatus>
    );
  }

  return (
    <>
      <OrganizerStatus>
        <div>
          {approveUsersCount !== 0 && (
            <ApproveStatus wait>
              {isMobileScreen
                ? `${approveUsersCount}명이 승인을 대기 중..`
                : `${approveUsersCount}명이 승인을 기다리고 있습니다!`}
            </ApproveStatus>
          )}
          <div />
        </div>
        <StyledApplyStatusButton
          type="button"
          className="confirm"
          onClick={handleClick}
        >
          스터디 참여 승인하기
        </StyledApplyStatusButton>
      </OrganizerStatus>
      <ParticipantListModal
        visible={ListModal}
        onClose={handelClose}
        onUpdate={onUpdateConfirm}
        participants={organizerRemove(participants)}
      />
    </>
  );
};

export default React.memo(ModeratorViewButton);

import React from 'react';

import _ from 'lodash';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { PARTICIPANT_FORM, BUTTON_NAME } from '../../../util/constants/constants';

import Button from '../../../styles/Button';
import palette from '../../../styles/palette';
import ParticipantList from './ParticipantList';

const {
  FORM_TITLE,
  PARTICIPANT_EMAIL,
  VIEW_APPLICATION,
  CONFIRM_YN,
  NO_EXIST_PARTICIPANT,
} = PARTICIPANT_FORM;
const { CLOSE } = BUTTON_NAME;

const ParticipantListModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 101;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);

  ${(props) => props.visible && css`
    &.animation {
      animation-name: fade-in;
      animation-duration: 0.3s;
      animation-fill-mode: both;
    }
  
    @keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
          opacity: 1;
      }
    }
  `};
`;

const ModalBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 6px;
  height: 550px;
  width: 600px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
  background: white;

  h2 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
  }
`;

const ParticipantTitleWrapper = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 260px 190px 145px;
  margin: 0.5rem 0 0.3rem 0;

  div {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 0.3rem;
  }
`;

const ParticipantListWrapper = styled.div`
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 2px solid ${palette.gray[3]};
  padding-top: 0.5rem;
  width: 99%;
  height: 100%;
  overflow-y: auto;
`;

const NoExistListWrapper = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  text-align: center;
  color: ${palette.gray[6]};
`;

const StyledButton = styled(Button)`
  &:last-of-type {
    margin-left: .7rem;
  }
`;

const ParticipantListModal = ({
  visible, onClose, participants, onUpdate,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <ParticipantListModalWrapper visible className="animation">
      <ModalBoxWrapper>
        <h2>{FORM_TITLE}</h2>
        <ParticipantTitleWrapper>
          <div>{PARTICIPANT_EMAIL}</div>
          <div>{VIEW_APPLICATION}</div>
          <div>{CONFIRM_YN}</div>
        </ParticipantTitleWrapper>
        <ParticipantListWrapper>
          {!_.isEmpty(participants) ? participants.map((participant) => (
            <ParticipantList
              key={participant.id}
              participant={participant}
              onUpdate={() => onUpdate(participant.id)}
            />
          )) : (
            <NoExistListWrapper>
              {NO_EXIST_PARTICIPANT}
            </NoExistListWrapper>
          )}
        </ParticipantListWrapper>
        <div className="buttons">
          <StyledButton onClick={onClose}>{CLOSE}</StyledButton>
        </div>
      </ModalBoxWrapper>
    </ParticipantListModalWrapper>
  );
};

export default ParticipantListModal;

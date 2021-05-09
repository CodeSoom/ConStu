import React from 'react';

import _ from 'lodash';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { PARTICIPANT_FORM, BUTTON_NAME } from '../../../util/constants/constants';

import palette from '../../../styles/palette';
import { mq4 } from '../../../styles/responsive';

import Button from '../../../styles/Button';
import ParticipantList from './ParticipantList';
import ListSvg from '../../../assets/icons/list.svg';

const {
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
  ${mq4({
    width: ['300px', 'calc(100% - 4rem)', '600px'],
  })};

  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 6px;
  height: 550px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
  background: white;

  .buttons {
    display: flex;
    justify-content: flex-end;
  }
`;

const ParticipantTitleWrapper = styled.div`
  ${mq4({
    display: ['flex', 'flex', 'grid'],
    flexDirection: ['row', 'row', 'unset'],
    gridTemplateColumns: ['unset', 'unset', '260px 190px 145px'],
    justifyContent: ['space-around', 'space-around', 'unset'],
  })};

  text-align: center;
  justify-items: center;
  align-items: center;
  margin: 0.5rem 0 0.3rem 0;

  div {
    ${mq4({ fontSize: ['1.rem', '1.1rem'] })};
    margin-bottom: 0.3rem;
  }

  div:nth-of-type(1) {
    ${mq4({ width: ['unset', '50%', 'unset'] })};
  }

  div:nth-of-type(2) {
    ${mq4({ width: ['unset', '30%', 'unset'] })};
  }

  div:nth-of-type(3) {
    ${mq4({ width: ['unset', '20%', 'unset'] })};
  }
`;

const ParticipantListWrapper = styled.div`
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 2px solid ${palette.gray[3]};
  padding-top: 0.5rem;
  width: 99%;
  height: 100%;
  overflow: auto;
`;

const NoExistListWrapper = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  text-align: center;
  color: ${palette.gray[6]};
  margin-top: .8rem;
`;

const StyledButton = styled(Button)`
  &:last-of-type {
    margin-left: .7rem;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  h2 {
    ${mq4({ fontSize: ['1.4rem', '1.6rem'] })};

    padding-right: .5rem;
    padding-top: .2rem;
  }
`;

const ListIcon = styled(ListSvg)`
  ${mq4({
    width: ['25px', '30px'],
    height: ['25px', '30px'],
  })};
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
        <HeaderWrapper>
          <ListIcon />
          <h2>스터디 신청자 목록</h2>
        </HeaderWrapper>
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

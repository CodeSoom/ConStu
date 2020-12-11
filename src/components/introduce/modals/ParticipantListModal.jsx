import React from 'react';

import styled from '@emotion/styled';

import { css } from '@emotion/react';

import Button from '../../../styles/Button';
import palette from '../../../styles/palette';
import ParticipantList from './ParticipantList';

const ParticipantListModalWrapper = styled.div`
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => props.visible && css`
    &.animation {
      animation-name: fade-in;
      animation-fill-mode: both;
      animation-duration: 0.3s;
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
  height: 550px;
  width: 600px;
  background: white;
  padding: 1.5rem;
  border-radius: 6px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
    text-align: center;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
  }
`;

const ParticipantTitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 260px 190px 145px;
  justify-items: center;
  align-items: center;
  margin: 0.5rem 0 0.3rem 0;

  div {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 0.3rem;
  }
`;

const ParticipantListWrapper = styled.div`
  height: 100%;
  width: 99%;
  border: 2px solid ${palette.gray[3]};
  border-radius: 4px;
  margin-bottom: 1rem;
  padding-top: 0.5rem;
  overflow-y: auto;
`;

const StyledButton = styled(Button)`
  &:last-of-type {
    margin-left: .7rem;
  }
`;

const ParticipantListModal = ({ visible, onClose, participants }) => {
  if (!visible) {
    return null;
  }

  return (
    <ParticipantListModalWrapper visible className="animation">
      <ModalBoxWrapper>
        <h2>스터디 신청자 목록 🙋‍♂️</h2>
        <ParticipantTitleWrapper>
          <div>신청자 이메일</div>
          <div>신청서 보기</div>
          <div>승인 여부</div>
        </ParticipantTitleWrapper>
        <ParticipantListWrapper>
          {participants.length && participants.map(({ id, confirm }) => (
            <ParticipantList
              key={id}
              id={id}
              confirm={confirm}
            />
          ))}
        </ParticipantListWrapper>
        <div className="buttons">
          <StyledButton onClick={onClose}>닫기</StyledButton>
        </div>
      </ModalBoxWrapper>
    </ParticipantListModalWrapper>
  );
};

export default ParticipantListModal;

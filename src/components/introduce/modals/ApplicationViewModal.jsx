import React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Button from '../../../styles/Button';
import palette from '../../../styles/palette';

const ApplicationViewModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 101;
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
  width: 400px;
  height: auto;
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

const ContentBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.2rem;

  label {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 0.3rem;
  }
`;

const ContentViewerWrapper = styled.textarea`
  font-weight: bold;
  cursor: unset;
  resize: none;
  outline: none;
  display: block;
  margin-bottom: 0.7rem;
  padding: 5px;
  border-radius: 3px;
  border: 2px solid #D7E2EB;
  color: rgb(33, 37, 41);
  transition-property: all;
  transition-delay: initial;
  transition-duration: 0.08s;
  transition-timing-function: ease-in-out;

  &:focus {
    border: 2px solid ${palette.gray[5]};
  }
`;

const StyledButton = styled(Button)`
  &:last-of-type {
    margin-left: .7rem;
  }
`;

const ApplicationViewModal = ({
  visible, onClose, participant,
}) => {
  const { reason, wantToGet, id } = participant;

  if (!visible) {
    return null;
  }

  return (
    <ApplicationViewModalWrapper visible className="animation">
      <ModalBoxWrapper>
        <h2>{`${id} 신청서 📚`}</h2>
        <ContentBoxWrapper>
          <label htmlFor="apply-reason">신청하게 된 이유</label>
          <ContentViewerWrapper
            rows="10"
            id="apply-reason"
            value={reason}
            readOnly
          />
        </ContentBoxWrapper>
        <ContentBoxWrapper>
          <label htmlFor="study-want">스터디를 통해 얻고 싶은 것은 무엇인가요?</label>
          <ContentViewerWrapper
            rows="10"
            id="study-want"
            value={wantToGet}
            readOnly
          />
        </ContentBoxWrapper>
        <div className="buttons">
          <StyledButton onClick={onClose}>닫기</StyledButton>
        </div>
      </ModalBoxWrapper>
    </ApplicationViewModalWrapper>
  );
};

export default ApplicationViewModal;

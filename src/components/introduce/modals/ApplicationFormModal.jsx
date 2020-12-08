import React from 'react';

import styled from '@emotion/styled';

import { css } from '@emotion/react';

import Button from '../../../styles/Button';
import palette from '../../../styles/palette';

const ApplicationFormModalWrapper = styled.div`
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
  height: 570px;
  width: 400px;
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

const ContentBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.2rem;

  label {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 0.3rem;
    ::before {
      content: '*';
      display: inline-block;
      vertical-align: top;
      font-weight: 400;
      color: ${palette.warn[1]};
      margin: 0 0.125rem 0 0;
      font-size: 1.25rem;
      line-height: 1.25rem;
    }
  }
`;

const ContentTextareaWrapper = styled.textarea`
  display: block;
  padding: 5px;
  resize: none;
  outline: none;
  border: 1px solid ${palette.gray[3]};
  border-radius: 3px;
  font-weight: bold;
  color: rgb(33, 37, 41);
  margin-bottom: 0.7rem;
  &:hover, &:focus {
    border: 2px solid ${palette.gray[4]};
  }
`;

const StyledButton = styled(Button)`
  &:last-of-type {
    margin-left: .7rem;
  }
`;

const ApplicationFormModal = ({ visible, onCancel, onConfirm }) => {
  if (!visible) {
    return null;
  }

  return (
    <ApplicationFormModalWrapper visible className="animation">
      <ModalBoxWrapper>
        <h2>스터디 참여 신청서 📚</h2>
        <ContentBoxWrapper>
          <label htmlFor="apply-reason">신청하게 된 이유</label>
          <ContentTextareaWrapper placeholder="내용을 입력해주세요." id="apply-reason" rows="10" />
        </ContentBoxWrapper>
        <ContentBoxWrapper>
          <label htmlFor="apply-reason">스터디를 통해 얻고 싶은 것은 무엇인가요?</label>
          <ContentTextareaWrapper placeholder="내용을 입력해주세요." id="study-want" rows="10" />
        </ContentBoxWrapper>
        <div className="buttons">
          <StyledButton onClick={onCancel}>취소</StyledButton>
          <StyledButton success onClick={onConfirm}>확인</StyledButton>
        </div>
      </ModalBoxWrapper>
    </ApplicationFormModalWrapper>
  );
};

export default ApplicationFormModal;

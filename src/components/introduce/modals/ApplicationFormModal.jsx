import React, { useState } from 'react';

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
  height: 575px;
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
  border: 2px solid #D7E2EB;
  border-radius: 3px;
  font-weight: bold;
  color: rgb(33, 37, 41);
  margin-bottom: 0.7rem;
  transition-duration: 0.08s;
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-delay: initial;
  &:focus {
    border: 2px solid ${palette.teal[5]};
  }

  ${({ error }) => error && css`
    &::placeholder {
      color: ${palette.warn[1]};
    }
    border: 2px solid ${palette.warn[1]};
  `};
`;

const StyledButton = styled(Button)`
  &:last-of-type {
    margin-left: .7rem;
  }
`;

const ApplicationFormModal = ({
  visible, onCancel, onConfirm, onChangeApply, fields,
}) => {
  const [error, setError] = useState(null);

  const { reason, wantToGet } = fields;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setError(null);
    onChangeApply({ name, value });
  };

  const handleCancel = () => {
    setError(null);
    onCancel();
  };

  const handleConfirm = () => {
    if (!reason.trim()) {
      setError('reason');
      return;
    }

    if (!wantToGet.trim()) {
      setError('wantToGet');
      return;
    }

    setError(null);
    onConfirm();
  };

  if (!visible) {
    return null;
  }

  return (
    <ApplicationFormModalWrapper visible className="animation">
      <ModalBoxWrapper>
        <h2>스터디 참여 신청서 📚</h2>
        <ContentBoxWrapper>
          <label htmlFor="apply-reason">신청하게 된 이유</label>
          <ContentTextareaWrapper
            error={error && error === 'reason'}
            rows="10"
            id="apply-reason"
            name="reason"
            placeholder="내용을 입력해주세요."
            value={reason}
            onChange={handleChange}
          />
        </ContentBoxWrapper>
        <ContentBoxWrapper>
          <label htmlFor="study-want">스터디를 통해 얻고 싶은 것은 무엇인가요?</label>
          <ContentTextareaWrapper
            error={error && error === 'wantToGet'}
            rows="10"
            id="study-want"
            name="wantToGet"
            placeholder="내용을 입력해주세요."
            value={wantToGet}
            onChange={handleChange}
          />
        </ContentBoxWrapper>
        <div className="buttons">
          <StyledButton onClick={handleCancel}>취소</StyledButton>
          <StyledButton success onClick={handleConfirm}>확인</StyledButton>
        </div>
      </ModalBoxWrapper>
    </ApplicationFormModalWrapper>
  );
};

export default ApplicationFormModal;

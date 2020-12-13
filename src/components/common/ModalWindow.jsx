import React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Button from '../../styles/Button';

const ModalWindowWrapper = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  z-index: 101;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 320px;
  padding: 1.5rem;
  border-radius: 6px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
  background: white;

  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 2rem;
  }
  
  .buttons {
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledButton = styled(Button)`
  &:last-of-type {
    margin-left: .7rem;
  }
`;

const ModalWindow = ({
  visible,
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <ModalWindowWrapper visible className="animation">
      <ModalBoxWrapper>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="buttons">
          <StyledButton onClick={onCancel}>{cancelText}</StyledButton>
          {onConfirm && (
            <StyledButton success onClick={onConfirm}>{confirmText}</StyledButton>
          )}
        </div>
      </ModalBoxWrapper>
    </ModalWindowWrapper>
  );
};

export default ModalWindow;

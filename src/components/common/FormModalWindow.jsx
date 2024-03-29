import React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import mq from '../../styles/responsive';

import Button from '../../styles/Button';

const FormModalWindowWrapper = styled.div`
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
  ${mq({
    width: ['300px', '320px'],
  })};

  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 6px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
  background: ${({ theme }) => theme.subBaseTone[0]};

  h2 {
    ${mq({ fontSize: ['1.2rem', '1.4rem'] })};

    margin-top: 0;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1rem;
    font-family: 'Nanum-Gothic', sans-serif;
    margin-bottom: 2rem;
  }
  
  .buttons {
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledButton = styled(Button)`
  padding: 0.4rem 1rem;

  &:last-of-type {
    margin-left: .7rem;
  }
`;

const FormModalWindow = ({
  visible,
  title,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  children,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <FormModalWindowWrapper visible className="animation">
      <ModalBoxWrapper>
        <h2>{title}</h2>
        <form onSubmit={onConfirm}>
          {children}
          <div className="buttons">
            <StyledButton type="button" onClick={onCancel}>{cancelText}</StyledButton>
            {onConfirm && (
              <StyledButton success type="submit">{confirmText}</StyledButton>
            )}
          </div>
        </form>
      </ModalBoxWrapper>
    </FormModalWindowWrapper>
  );
};

export default FormModalWindow;

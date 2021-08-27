import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import mq from '../../../styles/responsive';
import palette from '../../../styles/palette';

import FormModalWindow from '../../common/FormModalWindow';

const VerificationPasswordInput = styled.input`
  ${({ theme }) => mq({
    height: ['28px', '18px'],
    width: ['272px', '290px'],
    padding: ['4px 12px', '8px 12px'],
    fontSize: ['.8rem', '1rem'],
    border: [`1px solid ${theme.borderTone[1]}`, `2px solid ${theme.borderTone[1]}`],
  })};

  margin-bottom: 1rem;
  line-height: 24px;
  box-shadow: none;
  border-radius: 0.25rem;
  color: #5f5f5f;
  background: ${({ theme }) => theme.authColor[0]};
  transition-duration: 0.08s;
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-delay: initial;

  ${({ error }) => error && css`
    @keyframes shake {
        0% { left: -5px; }
        100% { right: -5px; }
    };
    ${mq({ border: [`1px solid ${palette.warn[1]}`, `2px solid ${palette.warn[1]}`] })};

    position: relative;
    animation: shake .1s linear;
    animation-iteration-count: 3;
    
    &::placeholder {
      color: ${palette.warn[1]};
    }
  `};
`;

const ConfirmPasswordModal = ({
  visible, onConfirm, onCancel, handleChange, password, error,
}) => (
  <FormModalWindow
    title="비밀번호 확인"
    visible={visible}
    onConfirm={onConfirm}
    onCancel={onCancel}
  >
    <VerificationPasswordInput
      error={error}
      type="password"
      autoComplete="password"
      value={password}
      onChange={handleChange}
      aria-label="password-confirm-input"
    />
  </FormModalWindow>
);

export default ConfirmPasswordModal;

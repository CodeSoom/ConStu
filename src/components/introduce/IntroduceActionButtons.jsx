import React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import palette from '../../styles/palette';

const IntroduceActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  font-weight: bold;
  font-size: 0.875rem;
  margin-left: 0.5rem;
  padding: 0.25rem 1rem;
  border-radius: 4px;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${palette.gray[6]};

  ${({ revise }) => revise && css`
    &:hover {
      background: ${palette.gray[1]};
      color: ${palette.teal[6]};
    }
  `};

  ${({ remove }) => remove && css`
    &:hover {
      background: ${palette.gray[1]};
      color: ${palette.warn[2]};
    }
  `};
`;

const IntroduceActionButtons = () => (
  <IntroduceActionButtonsWrapper>
    <ActionButton revise>수정</ActionButton>
    <ActionButton remove>삭제</ActionButton>
  </IntroduceActionButtonsWrapper>
);

export default IntroduceActionButtons;

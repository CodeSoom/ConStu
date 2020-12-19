import React, { useState } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import palette from '../../styles/palette';

import AskArticleDeleteModal from './modals/AskArticleDeleteModal';

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

const IntroduceActionButtons = ({ onRemove, onEdit }) => {
  const [modal, setModal] = useState(false);

  const handleConfirm = () => {
    setModal(false);
    onRemove();
  };

  const handleCancel = () => {
    setModal(false);
  };

  const handleRemove = () => {
    setModal(true);
  };

  return (
    <>
      <IntroduceActionButtonsWrapper>
        <ActionButton
          revise
          onClick={onEdit}
        >
          수정
        </ActionButton>
        <ActionButton
          remove
          onClick={handleRemove}
        >
          삭제
        </ActionButton>
      </IntroduceActionButtonsWrapper>
      <AskArticleDeleteModal
        visible={modal}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default IntroduceActionButtons;

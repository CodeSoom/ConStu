import React, { useState } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';

import { BUTTON_NAME } from '../../util/constants/constants';

import AskArticleDeleteModal from './modals/AskArticleDeleteModal';

const { EDIT, DELETE } = BUTTON_NAME;

const IntroduceActionButtonsWrapper = styled.div`
  ${({ theme }) => mq({
    width: ['unset', 'unset', '30%'],
    marginTop: ['1rem', '1rem', '1.2rem'],
    borderTop: [`1px solid ${theme.borderTone[3]}`, `1px solid ${theme.borderTone[3]}`, 0],
    paddingTop: ['1rem', '1rem', 0],
  })};

  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

const ActionButton = styled.button`
  ${mq({
    padding: ['.5rem 1rem', '.6rem 1.2rem'],
    fontSize: ['.8rem', '.875rem'],
  })};

  color: ${palette.gray[6]};
  background: ${({ theme }) => theme.subBaseTone[3]};
  font-family: 'Jua', sans-serif;
  margin-left: 0.5rem;
  border-radius: 4px;
  border: none;
  transition: background-color .3s;

  ${({ revise, theme }) => revise && css`
    &:hover {
      background: ${theme.subBaseTone[0]};
      color: ${palette.teal[6]};
    }
  `};

  ${({ remove, theme }) => remove && css`
    &:hover {
      background: ${theme.subBaseTone[0]};
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
          {EDIT}
        </ActionButton>
        <ActionButton
          remove
          onClick={handleRemove}
        >
          {DELETE}
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

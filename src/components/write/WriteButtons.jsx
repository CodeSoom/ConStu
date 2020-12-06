import React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import palette from '../../styles/palette';

import Button from '../../styles/Button';

const WriteButtonsWrapper = styled.div`
  margin-top: 3rem;

  ${(props) => props.error && css`
    margin-top: 2rem;
  `};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ErrorWrapper = styled.div`
  margin-top: 2rem;
  font-weight: bold;
  font-size: 1rem;
  color: ${palette.warn[2]};
`;

const CancelButton = styled(Button)`
  padding: 0.45rem 1rem;
  background: white;
  color: ${palette.warn[1]};
  &:hover {
    color: white;
    background: ${palette.warn[1]};
  }
`;

const SubmitButton = styled(Button)`
  padding: 0.45rem 5rem;
`;

const WriteButtons = ({ error, onSubmit, onCancel }) => (
  <>
    {error && (
      <ErrorWrapper>{error}</ErrorWrapper>
    )}
    <WriteButtonsWrapper error={error}>
      <ButtonWrapper>
        <SubmitButton
          success
          type="button"
          onClick={onSubmit}
        >
          등록하기
        </SubmitButton>
        <CancelButton
          warn
          type="button"
          onClick={onCancel}
        >
          취소
        </CancelButton>
      </ButtonWrapper>
    </WriteButtonsWrapper>
  </>
);

export default WriteButtons;

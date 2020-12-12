/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import styled from '@emotion/styled';

import palette from './palette';

const StyledApplyStatusButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  margin: .5rem 0 .5rem 0;
  padding: 0.25rem 5rem;
  font-size: 1.5em;
  line-height: 0;
  font-family: 'Gamja Flower', cursive;
  border-radius: 0.4rem;
  border: none;
  outline: none;

  &.deadline {
    cursor: not-allowed;
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
  }

  &.apply-cancel {
    cursor: pointer;
    background: ${palette.orange[4]};
    color: white;
    &:hover {
      background: ${palette.orange[3]};
    }
  }

  &.apply-reject {
    background: ${palette.gray[1]};
    border: 2px solid ${palette.warn[0]};
    color: ${palette.warn[1]};
  }

  &.apply-complete {
    background: ${palette.gray[1]};
    border: 2px solid #a5d8ff;
    color: #74c0fc;
  }

  &.apply {
    color: white;
    cursor: pointer;
    background: ${palette.teal[5]};
    &:hover {
      background: ${palette.teal[4]};
    }
  }

  &.confirm {
    color: white;
    cursor: pointer;
    background: #4dabf7;
    &:hover {
      background: #74c0fc;
    }
  }
`;

const StyledApplyStatusButton = (props) => (
  <StyledApplyStatusButtonWrapper {...props} />
);

export default StyledApplyStatusButton;

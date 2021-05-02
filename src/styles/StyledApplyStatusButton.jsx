/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import styled from '@emotion/styled';

import mq from './responsive';
import palette from './palette';

const StyledApplyStatusButtonWrapper = styled.button`
  ${mq({
    fontSize: ['.8rem', '1rem'],
    height: ['25px', '30px', '33px'],
    padding: ['0.2rem 1rem', '0.25rem 2rem', '0.25rem 3rem', '0.25rem 5rem'],
    margin: [0, '.5rem 0 .5rem 0'],
  })};

  font-family: 'Jua', sans-serif;
  font-weight: lighter;
  display: inline-flex;
  align-items: center;
  border: none;
  border-radius: 0.4rem;
  line-height: 0;

  &.deadline {
    cursor: not-allowed;
    color: ${palette.gray[5]};
    background: ${palette.gray[3]};
  }

  &.apply-cancel {
    color: white;
    background: ${palette.orange[4]};

    &:hover {
      background: ${palette.orange[3]};
    }
  }

  &.apply-reject {
    cursor: not-allowed;
    border: 2px solid ${palette.warn[0]};
    color: ${palette.warn[1]};
    background: ${palette.gray[1]};
  }

  &.apply-complete { 
    cursor: unset;
    border: 2px solid #a5d8ff;
    color: #74c0fc;
    background: ${palette.gray[1]};
  }

  &.apply {
    color: white;
    background: ${palette.teal[5]};

    &:hover {
      background: ${palette.teal[4]};
    }
  }

  &.confirm { 
    ${mq({ padding: ['0.2rem 1rem', '0.25rem 2rem', '0.25rem 3rem', '0.25rem 4rem'] })};
    color: white;
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

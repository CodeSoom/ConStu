/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Link } from 'react-router-dom';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import palette from './palette';

const ButtonWrapper = (props) => css`
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Noto Sans KR', sans-serif;
  padding: 0.25rem 1rem;
  color: ${palette.gray[7]};
  outline: none;
  cursor: pointer;
  border: 1px solid ${palette.gray[7]};
  background: white;
  &:hover {
    color: white;
    background: ${palette.gray[7]};
  }

  ${props.warn
    && css`
      color: white;
      padding: 0.15rem 0.9rem;
      background: ${palette.warn[1]};
      border: 1px solid ${palette.warn[1]};
      &:hover {
        background: white;
        color: ${palette.warn[1]};
        border: 1px solid ${palette.warn[1]};
      }
  `}

  ${props.success
    && css`
    color: white;
    background: ${palette.teal[5]};
    border: 1px solid ${palette.teal[5]};
    &:hover {
      background: white;
      color: ${palette.teal[5]};
      border: 1px solid ${palette.teal[5]};
    }
  `}
`;

const StyledButton = styled.button`
  ${ButtonWrapper}
`;
const StyledLink = styled(Link)`
  ${ButtonWrapper}
`;

const Button = (props) => {
  const { to, success, warn } = props;

  return (
    <>
      {to ? (
        <StyledLink
          {...props}
          warn={warn && 1}
          success={success && 1}
        />
      ) : (
        <StyledButton {...props} />
      )}
    </>
  );
};

export default Button;

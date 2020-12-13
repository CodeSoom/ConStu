/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Link } from 'react-router-dom';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import palette from './palette';

const ButtonWrapper = ({ warn, success }) => css`
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Noto Sans KR', sans-serif;
  outline: none;
  padding: 0.25rem 1rem;
  border-radius: 4px;
  border: 2px solid ${palette.gray[6]};
  background: white;
  color: ${palette.gray[7]};
  transition-duration: 0.08s;
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-delay: initial;

  &:hover {
    border: 2px solid ${palette.gray[7]};
    color: white;
    background: ${palette.gray[7]};
  }

  ${warn && css`
      padding: 0.15rem 0.9rem;
      border: 2px solid ${palette.warn[1]};
      color: white;
      background: ${palette.warn[1]};

      &:hover {
        border: 2px solid ${palette.warn[1]};
        background: white;
        color: ${palette.warn[1]};
      }
  `}

  ${success && css`
    border: 2px solid ${palette.teal[5]};
    color: white;
    background: ${palette.teal[5]};

    &:hover {
      border: 2px solid ${palette.teal[5]};
      background: white;
      color: ${palette.teal[5]};
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

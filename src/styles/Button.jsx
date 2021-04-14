/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Link } from 'react-router-dom';

import facepaint from 'facepaint';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import palette from './palette';

const mq = facepaint([
  '@media(min-width: 1024px)',
]);

const fontSizeButton = css(
  mq({
    fontSize: ['2vw', '1rem'],
  }),
);

const ButtonWrapper = ({ warn, success }) => css`
  font-family: 'Jua', sans-serif;
  font-weight: inherit;
  cursor: pointer;
  ${fontSizeButton};
  color: ${palette.gray[7]};
  background: white;
  transition: all .1s ease-in-out;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 2px solid ${palette.gray[6]};

  &:hover {
    color: white;
    background: ${palette.gray[7]};
    border: 2px solid ${palette.gray[7]};
  }

  ${warn && css`
    color: white;
    background: ${palette.warn[1]};
    padding: 0.3rem 1rem;
    border: 2px solid ${palette.warn[1]};

    &:hover {
      background: white;
      color: ${palette.warn[1]};
      border: 2px solid ${palette.warn[1]};
    }
  `}

  ${success && css`
    color: white;
    background: ${palette.teal[5]};
    border: 2px solid ${palette.teal[5]};

    &:hover {
      background: white;
      color: ${palette.teal[5]};
      border: 2px solid ${palette.teal[5]};
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

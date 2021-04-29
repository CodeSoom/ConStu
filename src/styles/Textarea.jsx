/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import palette from './palette';

const TextareaWrapper = styled.textarea`
  font-family: 'Nanum Gothic', sans-serif;
  font-size: .9rem;
  color: ${palette.gray[8]};
  resize: none;
  outline: none;
  line-height: 17px;
  display: block;
  margin-bottom: 0.7rem;
  padding: 6px;
  border: 2px solid #D7E2EB;
  border-radius: 3px;
  transition-property: all;
  transition-delay: initial;
  transition-duration: 0.08s;
  transition-timing-function: ease-in-out;

  &:focus {
    ${({ error }) => !error && css`
      border: 2px solid ${palette.teal[5]};
    `};
  }

  ${({ error }) => error && css`
    @keyframes shake {
        0% { left: -5px; }
        100% { right: -5px; }
    };

    position: relative;
    border: 2px solid ${palette.warn[1]};
    animation: shake .1s linear;
    animation-iteration-count: 3;
    
    &::placeholder {
      color: ${palette.warn[1]};
    }
  `};
`;

const Textarea = (props) => (
  <TextareaWrapper {...props} />
);

export default Textarea;

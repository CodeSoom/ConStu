/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import palette from './palette';

const TextareaWrapper = styled.textarea`
  font-weight: bold;
  resize: none;
  outline: none;
  display: block;
  margin-bottom: 0.7rem;
  padding: 5px;
  border: 2px solid #D7E2EB;
  border-radius: 3px;
  color: rgb(33, 37, 41);
  transition-property: all;
  transition-delay: initial;
  transition-duration: 0.08s;
  transition-timing-function: ease-in-out;

  &:focus {
    border: 2px solid ${palette.teal[5]};
  }

  ${({ error }) => error && css`
    border: 2px solid ${palette.warn[1]};

    &::placeholder {
      color: ${palette.warn[1]};
    }
  `};
`;

const Textarea = (props) => (
  <TextareaWrapper {...props} />
);

export default Textarea;

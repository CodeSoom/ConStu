/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import palette from './palette';

const ParticipantListButtonWrapper = styled.button`
  cursor: pointer;
  font-size: 0.8rem;
  font-family: 'Jua', sans-serif;
  color: white;
  outline: none;
  padding: 5px 0.8rem 3px 0.8rem;
  border: none;
  border-radius: 4px;
  background: none;
  transition-duration: 0.2s;
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-delay: initial;

  ${({ sky }) => sky && css`
    border-bottom: 2px solid #4dabf7;
    box-shadow: 0px 1px 2px #4dabf7;
    background: #74c0fc;

    &:hover {
      box-shadow: none;
      border-bottom: 2px solid #74c0fc;
    }
  `};

  ${({ confirm }) => confirm && css`
    border-bottom: 2px solid ${palette.teal[6]};
    box-shadow: 0px 1px 2px ${palette.teal[6]};
    background: ${palette.teal[5]};

    &:hover {
      box-shadow: none;
      border-bottom: 2px solid ${palette.teal[5]};
    }
  `};

  ${({ cancel }) => cancel && css`
    border-bottom: 2px solid ${palette.warn[2]};
    box-shadow: 0px 1px 2px ${palette.warn[2]};
    background: ${palette.warn[1]};

    &:hover {
      box-shadow: none;
      border-bottom: 2px solid ${palette.warn[1]};
    }
  `};
`;

const ParticipantListButton = (props) => (
  <ParticipantListButtonWrapper {...props} />
);

export default ParticipantListButton;

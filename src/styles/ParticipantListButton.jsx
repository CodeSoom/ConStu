/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import palette from './palette';

const ParticipantListButtonWrapper = styled.button`
  transition-duration: 0.08s;
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-delay: initial;
  font-size: 0.8rem;
  padding: 0.15rem 0.7rem;
  font-weight: bold;
  outline: none;
  border: none;
  cursor: pointer;
  background: none;
  font-family: 'Noto Sans KR', sans-serif;
  border-radius: 4px;
  color: white;

  ${({ sky }) => sky && css`
    background: #74c0fc;
    border-bottom: 2px solid #4dabf7;
    box-shadow: 0px 2px 4px #4dabf7;
    &:hover{
      box-shadow: none;
      border-bottom: 2px solid #74c0fc;
    }
  `};

  ${({ confirm }) => confirm && css`
    background: ${palette.teal[5]};
    border-bottom: 2px solid ${palette.teal[6]};
    box-shadow: 0px 2px 4px ${palette.teal[6]};
    &:hover{
      box-shadow: none;
      border-bottom: 2px solid ${palette.teal[5]};
    }
  `};

  ${({ cancel }) => cancel && css`
    background: ${palette.warn[1]};
    border-bottom: 2px solid ${palette.warn[2]};
    box-shadow: 0px 2px 4px ${palette.warn[2]};
    &:hover{
      box-shadow: none;
      border-bottom: 2px solid ${palette.warn[1]};
    }
  `};
`;

const ParticipantListButton = (props) => (
  <ParticipantListButtonWrapper {...props} />
);

export default ParticipantListButton;

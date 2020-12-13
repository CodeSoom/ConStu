import React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import palette from './palette';

const DateTimeStatusWrapper = styled.div`
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Gamja Flower', cursive;
  display: inline-flex;
  margin-top: 1rem;
  margin-bottom: 1rem;    
  margin-left: 1.5rem;
  padding: .2rem .6rem .2rem .6rem;
  border-radius: 0.3rem;
  color: white;

  ${({ status }) => status === 'mainRecruit'
    && css`
      margin-bottom: 0.5rem;
      background: ${palette.cyan[4]};
      animation: blink-animation 1.5s steps(5, start) infinite;
      -webkit-animation: blink-animation 1.5s steps(5, start) infinite;

      @keyframes blink-animation {
        to {
          visibility: hidden;
        }
      }

      @-webkit-keyframes blink-animation {
        to {
          visibility: hidden;
        }
      }
  `}

  ${({ status }) => status === 'mainDeadline'
    && css`
      margin-bottom: 0.5rem;
      background: #ff6b6b;
  `}

  ${({ status }) => status === 'introduceRecruit'
    && css`
      font-size: 1.1rem;
      align-items: center;
      margin: 0;
      padding: .2rem 40px .2rem 40px;
      border-radius: 0.5rem;
      border: 1.5px solid ${palette.orange[4]};
      background: white;
      color: ${palette.orange[4]};
      animation: blink-animation 1.5s steps(5, start) infinite;
      -webkit-animation: blink-animation 1.5s steps(5, start) infinite;

      @keyframes blink-animation {
        to {
          visibility: hidden;
        }
      }

      @-webkit-keyframes blink-animation {
        to {
          visibility: hidden;
        }
      }
  `}

  ${({ status }) => status === 'introduceDeadline'
    && css`
      font-size: 1.1rem;
      align-items: center;
      margin: 0;
      padding: 0 40px 0 40px;
      border: 1.5px solid #ff6b6b;
      color: #ff6b6b;
      background: white;
  `}
`;

const DateTimeStatus = ({ children, status }) => (
  <DateTimeStatusWrapper status={status}>
    {children}
  </DateTimeStatusWrapper>
);

export default DateTimeStatus;

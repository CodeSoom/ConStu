import React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { mq2 } from './responsive';
import palette from './palette';

const mainDateTimeStatus = css(mq2({
  fontSize: ['.6rem', '0.8rem'],
  height: ['15px', '20px'],
}));

const introduceDateTimeStatus = css(mq2({
  fontSize: ['0.8rem', '0.9rem'],
  padding: ['.2rem 30px .2rem 30px', '.2rem 40px .2rem 40px'],
  height: ['25px', '30px'],
}));

const DateTimeStatusWrapper = styled.div`
  font-weight: bold;
  font-family: 'Nanum Gothic', sans-serif;
  color: white;
  align-items: center;
  display: inline-flex;
  margin: .5rem 0 .5rem 1.5rem;
  padding: .2rem .6rem .2rem .6rem;
  border-radius: 0.3rem;

  ${({ status }) => status === 'mainRecruit' && css`
    ${mainDateTimeStatus}
    background: ${palette.teal[7]};
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

  ${({ status }) => status === 'mainDeadline' && css`
    ${mainDateTimeStatus}
    background: #ed6f63;
  `}

  ${({ status }) => status === 'introduceRecruit' && css`
    ${introduceDateTimeStatus}
    align-items: center;
    margin: 0;
    border-radius: 0.5rem;
    border: 2px solid ${palette.teal[7]};
    background: #FCF6F5;
    color: ${palette.teal[7]};
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

  ${({ status }) => status === 'introduceDeadline' && css`
    ${introduceDateTimeStatus}
    align-items: center;
    margin: 0;
    border: 2px solid #ed6f63;
    color: #ed6f63;
    background: #FCF6F5;
  `}
`;

const DateTimeStatus = ({ children, status }) => (
  <DateTimeStatusWrapper status={status}>
    {children}
  </DateTimeStatusWrapper>
);

export default DateTimeStatus;

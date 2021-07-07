import React from 'react';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';

import Button from '../../styles/Button';

const ErrorScreenTemplateBlock = styled.div`
  top: -40px;
  left: 0px;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorScreenWrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-box-pack: center;

  .message {
    ${mq({ fontSize: ['2rem', '3rem'] })};

    text-align: center;
    line-height: 1.5;
    margin-bottom: 2rem;
  }
`;

const StyledButton = styled(Button)`
  ${mq({
    fontSize: ['1.2rem', '1.4rem'],
    padding: ['0.4rem 1rem', '0.6rem 1.2rem'],

  })};

  transition: none;

  &:hover {
    background: ${palette.teal[4]};
    color: white;
    border: 2px solid ${palette.teal[4]};
  }
`;

const ErrorScreenTemplate = ({
  message, buttonText, onClick, children,
}) => (
  <ErrorScreenTemplateBlock>
    <ErrorScreenWrapper>
      {children}
      <div className="message">
        {message}
      </div>
      <StyledButton success onClick={onClick}>
        {buttonText}
      </StyledButton>
    </ErrorScreenWrapper>
  </ErrorScreenTemplateBlock>
);

export default ErrorScreenTemplate;

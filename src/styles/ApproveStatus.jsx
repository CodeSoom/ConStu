/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { ImCheckmark } from 'react-icons/im';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import palette from './palette';

const ApproveStatusWrapper = styled.div`
  font-size: 1rem;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1rem;
  line-height: 0;

  ${({ load }) => load && css`
    color: ${palette.violet[4]};
  `};

  ${({ approve }) => approve && css`
    color: #40c057;
  `};

  ${({ wait }) => wait && css`
    color: #f783ac;
  `};
`;

const LoadingContent = styled.span`
  margin-left: .3rem;
  border-radius: 100%;
  border-top: 3px solid ${palette.violet[2]};
  border-bottom: 3px solid ${palette.violet[2]};
  border-right: 3px solid ${palette.violet[4]};
  border-left: 3px solid ${palette.violet[4]};
  width: 12px;
  height: 12px;
  animation: load  0.75s ease infinite;

  @keyframes load {
    0% { 
      transform: rotate( 0deg ); 
    }
    
    100% { 
      transform: rotate(180deg); 
    }
  }
`;

const WaitApprovalContent = styled.span`
  margin-left: .3rem;
  border-radius: 100%;
  border-top: 3px solid #fcc2d7;
  border-bottom: 3px solid #fcc2d7;
  border-right: 3px solid #f783ac;
  border-left: 3px solid #f783ac;
  width: 12px;
  height: 12px;
  animation: load  0.75s ease infinite;

  @keyframes load {
    0% { 
      transform: rotate( 0deg ); 
    }
    
    100% { 
      transform: rotate(180deg); 
    }
  }
`;

const ApproveStatus = ({ children, ...props }) => {
  const { load, approve, wait } = props;

  return (
    <ApproveStatusWrapper {...props}>
      {children}
      {wait && <WaitApprovalContent />}
      {load && <LoadingContent />}
      {approve && <ImCheckmark style={{ marginLeft: 4 }} /> }
    </ApproveStatusWrapper>
  );
};

export default ApproveStatus;

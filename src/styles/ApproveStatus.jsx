/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { ImCheckmark } from 'react-icons/im';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import palette from './palette';
import mq, { mq2 } from './responsive';

const ImCheckMark = styled(ImCheckmark)`
  margin-bottom: 4px;
  margin-left: 4px;
`;

const ApproveStatusWrapper = styled.div`
  ${mq({
    fontSize: ['.9rem', '1rem'],
    padding: [0, 0, 0, '0rem 1rem'],
  })};

  font-weight: lighter;
  display: inline-flex;
  align-items: center;
  line-height: 0;

  ${({ load }) => load && css`
    color: ${palette.violet[4]};
  `};

  ${({ approve }) => approve && css`
    margin-bottom: -4px;
    color: #40c057;
  `};

  ${({ wait }) => wait && css`
    color: #f783ac;
  `};
`;

const LoadingContent = styled.span`
  ${mq2({
    width: ['8px', '12px'],
    height: ['8px', '12px'],
  })};

  margin-bottom: .1rem;
  margin-left: .3rem;
  border-radius: 100%;
  border-top: 3px solid ${palette.violet[2]};
  border-bottom: 3px solid ${palette.violet[2]};
  border-right: 3px solid ${palette.violet[4]};
  border-left: 3px solid ${palette.violet[4]};
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
  ${mq2({
    width: ['8px', '12px'],
    height: ['8px', '12px'],
  })};

  margin-bottom: .1rem;
  margin-left: .3rem;
  border-radius: 100%;
  border-top: 3px solid #fcc2d7;
  border-bottom: 3px solid #fcc2d7;
  border-right: 3px solid #f783ac;
  border-left: 3px solid #f783ac;
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
      {approve && <ImCheckMark /> }
    </ApproveStatusWrapper>
  );
};

export default ApproveStatus;

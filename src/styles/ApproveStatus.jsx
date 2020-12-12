/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import styled from '@emotion/styled';

import palette from './palette';

const ApproveStatusWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  font-weight: bold;
  line-height: 0;
  font-size: 1rem;
  color: ${palette.violet[4]};
  padding: 0.8rem 1rem;
`;

const LoadingContent = styled.span`
  margin-left: .3rem;
  width: 12px;
  height: 12px;
  border-top: 3px solid ${palette.violet[2]};
  border-bottom: 3px solid ${palette.violet[2]};
  border-right: 3px solid ${palette.violet[4]};
  border-left: 3px solid ${palette.violet[4]};
  animation: load  0.75s ease infinite;
  border-radius: 100%;

  @keyframes load {
    0% { transform: rotate( 0deg ); }
    100% { transform: rotate(180deg); }
  }
`;

const ApproveStatus = ({ children, ...props }) => (
  <ApproveStatusWrapper {...props}>
    {children}
    <LoadingContent />
  </ApproveStatusWrapper>
);

export default ApproveStatus;

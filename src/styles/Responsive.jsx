/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import styled from '@emotion/styled';

const ResponsiveContainer = styled.div`
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1024px;

  @media (max-width: 1024px) {
    width: 768px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Responsive = ({ children, ...rest }) => (
  <ResponsiveContainer {...rest}>
    {children}
  </ResponsiveContainer>
);

export default Responsive;

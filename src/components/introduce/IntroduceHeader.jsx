import React from 'react';

import styled from '@emotion/styled';

import palette from '../../styles/palette';

const IntroduceHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid ${palette.gray[4]};
  
  h1 {
    font-size: 2.3rem;
    margin: 0;
    line-height: 1.5;
  }
`;

const IntroduceHeader = ({ group, children }) => {
  const { title } = group;

  return (
    <IntroduceHeaderWrapper>
      <h1>{title}</h1>
      {children}
    </IntroduceHeaderWrapper>
  );
};

export default IntroduceHeader;

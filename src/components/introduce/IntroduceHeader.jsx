import React from 'react';

import styled from '@emotion/styled';

import palette from '../../styles/palette';

const IntroduceHeaderWrapper = styled.div`
  border-bottom: 2px solid ${palette.gray[4]};
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  
  h1 {
    font-size: 2.3rem;
    line-height: 1.5;
    margin: 0;
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

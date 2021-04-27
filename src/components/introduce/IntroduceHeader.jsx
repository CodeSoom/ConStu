import React from 'react';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';

const IntroduceHeaderWrapper = styled.div`
  ${mq({
    flexDirection: ['column', 'row'],
  })};

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid ${palette.gray[4]};
  
  h1 {
  ${mq({
    fontSize: ['1.5rem', '1.8rem', '2rem', '2.3rem'],
    width: ['100%', '50%'],
  })};
  
    word-break: keep-all;
    overflow-wrap: break-word;
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

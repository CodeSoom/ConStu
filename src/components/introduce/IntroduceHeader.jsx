import React from 'react';

import { Helmet } from 'react-helmet-async';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';

const IntroduceHeaderWrapper = styled.div`
  ${mq({
    flexDirection: ['column', 'row'],
    paddingBottom: ['1rem', '1.5rem'],
    marginBottom: ['1rem', '2rem'],
    marginTop: ['2rem', '3rem'],
  })};

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.borderTone[0]};

  h1 {
  ${mq({
    fontSize: ['1.7rem', '1.8rem', '2rem', '2.3rem'],
    width: ['100%', '50%'],
  })};
  
    word-break: keep-all;
    overflow-wrap: break-word;
    text-rendering: optimizeLegibility;
    line-height: 1.5;
    margin: 0;
  }
`;

const IntroduceHeader = ({ title, children }) => (
  <>
    <Helmet>
      <title>{`ConStu | ${title}`}</title>
    </Helmet>
    <IntroduceHeaderWrapper>
      <h1>{title}</h1>
      {children}
    </IntroduceHeaderWrapper>
  </>
);

export default IntroduceHeader;

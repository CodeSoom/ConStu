import React from 'react';

import styled from '@emotion/styled';

import palette from './palette';

const SubTitleWrapper = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0;
  margin-top: 1rem;
  padding: 7px 2rem 7px 2rem;
  border-bottom: 2px solid ${palette.violet[3]};
  width: 17%;
`;

const SubTitle = ({ title }) => (
  <SubTitleWrapper>
    {title}
  </SubTitleWrapper>
);

export default SubTitle;

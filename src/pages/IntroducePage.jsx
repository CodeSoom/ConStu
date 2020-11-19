import React from 'react';

import { useParams } from 'react-router-dom';

import styled from '@emotion/styled';

import IntroduceContainer from '../containers/introduce/IntroduceContainer';

const IntroducePageWrapper = styled.div``;

const IntroducePage = ({ params }) => {
  const { id } = params || useParams();

  return (
    <IntroducePageWrapper>
      <h2>스터디 소개</h2>
      <IntroduceContainer groupId={id} />
    </IntroducePageWrapper>
  );
};
export default IntroducePage;

import React from 'react';

import { useParams } from 'react-router-dom';

import styled from '@emotion/styled';

import Responsive from '../styles/Responsive';

import IntroduceContainer from '../containers/introduce/IntroduceContainer';

const IntroducePageWrapper = styled(Responsive)`
  margin-top: 6em;
`;

const IntroducePage = ({ params }) => {
  const { id } = params || useParams();

  return (
    <IntroducePageWrapper>
      <IntroduceContainer groupId={id} />
    </IntroducePageWrapper>
  );
};
export default React.memo(IntroducePage);

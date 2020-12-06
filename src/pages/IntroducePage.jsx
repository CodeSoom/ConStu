import React from 'react';

import { useParams } from 'react-router-dom';

import Responsive from '../styles/Responsive';

import IntroduceContainer from '../containers/introduce/IntroduceContainer';

const IntroducePage = ({ params }) => {
  const { id } = params || useParams();

  return (
    <Responsive>
      <IntroduceContainer groupId={id} />
    </Responsive>
  );
};
export default React.memo(IntroducePage);

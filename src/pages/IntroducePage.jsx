import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import Responsive from '../styles/Responsive';
import { loadStudyGroup } from '../reducers/groupSlice';

import IntroduceFormContainer from '../containers/introduce/IntroduceFormContainer';
import IntroduceHeaderContainer from '../containers/introduce/IntroduceHeaderContainer';

const IntroducePageWrapper = styled(Responsive)`
  margin-top: 6em;
`;

const IntroducePage = ({ params }) => {
  const { id } = params || useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStudyGroup(id));
  }, [dispatch, id]);

  return (
    <IntroducePageWrapper>
      <IntroduceHeaderContainer />
      <IntroduceFormContainer />
    </IntroducePageWrapper>
  );
};
export default React.memo(IntroducePage);

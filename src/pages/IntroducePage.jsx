import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import styled from '@emotion/styled';

import { loadStudyGroup } from '../reducers/groupSlice';

import Responsive from '../styles/Responsive';
import IntroduceFormContainer from '../containers/introduce/IntroduceFormContainer';
import IntroduceHeaderContainer from '../containers/introduce/IntroduceHeaderContainer';
import ReviewContainer from '../containers/introduce/ReviewContainer';

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
      <ReviewContainer />
    </IntroducePageWrapper>
  );
};
export default React.memo(IntroducePage);

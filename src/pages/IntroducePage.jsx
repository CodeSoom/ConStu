import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { loadStudyGroup } from '../reducers/groupSlice';

import GlobalBlock from '../styles/GlobalBlock';
import ReviewContainer from '../containers/introduce/ReviewContainer';
import ThemeToggleContainer from '../containers/base/ThemeToggleContainer';
import IntroduceFormContainer from '../containers/introduce/IntroduceFormContainer';
import IntroduceHeaderContainer from '../containers/introduce/IntroduceHeaderContainer';

const IntroducePage = ({ params }) => {
  const { id } = params || useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStudyGroup(id));
  }, [dispatch, id]);

  return (
    <GlobalBlock>
      <ThemeToggleContainer />
      <IntroduceHeaderContainer />
      <IntroduceFormContainer />
      <ReviewContainer />
    </GlobalBlock>
  );
};
export default React.memo(IntroducePage);

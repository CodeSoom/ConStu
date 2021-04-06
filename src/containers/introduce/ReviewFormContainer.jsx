import React, { useState, useCallback } from 'react';

import { useInterval } from 'react-use';
import { useSelector, useDispatch } from 'react-redux';

import { getAuth, getGroup } from '../../util/utils';
import { changeStudyReviewFields, setStudyReview } from '../../reducers/groupSlice';

import ReviewForm from '../../components/introduce/ReviewForm';

const ReviewFormContainer = () => {
  const [realTime, setRealTime] = useState(Date.now());

  const dispatch = useDispatch();

  const user = useSelector(getAuth('user'));
  const group = useSelector(getGroup('group'));
  const studyReviewFields = useSelector(getGroup('studyReviewFields'));

  useInterval(() => setRealTime(Date.now()), 1000);

  const onChangeReviewFields = useCallback(({ name, value }) => {
    dispatch(changeStudyReviewFields({ name, value }));
  }, [dispatch]);

  const onSubmitReview = useCallback(() => {
    dispatch(setStudyReview({
      id: user,
      ...studyReviewFields,
    }));
  }, [dispatch, user, studyReviewFields]);

  if (!group) {
    return null;
  }

  return (
    <ReviewForm
      user={user}
      group={group}
      time={realTime}
      fields={studyReviewFields}
      onChangeReview={onChangeReviewFields}
      onSubmit={onSubmitReview}
    />
  );
};

export default ReviewFormContainer;

import React, { useState, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useInterval } from 'react-use';

import { getAuth, getGroup } from '../../util/utils';

import StudyReviewForm from '../../components/introduce/StudyReviewForm';
import { changeStudyReviewFields } from '../../reducers/groupSlice';

const StudyReviewContainer = () => {
  const [realTime, setRealTime] = useState(Date.now());

  const dispatch = useDispatch();

  const user = useSelector(getAuth('user'));
  const group = useSelector(getGroup('group'));
  const studyReviewFields = useSelector(getGroup('studyReviewFields'));

  useInterval(() => {
    setRealTime(Date.now());
  }, 1000);

  const onChangeReviewFields = useCallback(({ name, value }) => {
    dispatch(changeStudyReviewFields({ name, value }));
  }, [dispatch]);

  if (!group) {
    return null;
  }

  return (
    <StudyReviewForm
      user={user}
      group={group}
      time={realTime}
      fields={studyReviewFields}
      onChangeReview={onChangeReviewFields}
    />
  );
};

export default StudyReviewContainer;

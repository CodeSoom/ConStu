import React, { useState, useCallback } from 'react';

import { useInterval } from 'react-use';
import { useSelector, useDispatch } from 'react-redux';

import {
  getAuth, getGroup, isCheckedTimeStatus, changeDateToTime,
} from '../../util/utils';
import { changeStudyReviewFields, setStudyReview } from '../../reducers/groupSlice';

import SubTitle from '../../styles/SubTitle';

import ReviewForm from '../../components/introduce/ReviewForm';
import ReviewList from '../../components/introduce/ReviewList';

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

  const { participants, personnel, applyEndDate } = group;

  const isApplyTime = isCheckedTimeStatus({
    applyEndTime: changeDateToTime(applyEndDate),
    personnel,
    participants,
    time: realTime,
  });

  if (!isApplyTime) {
    return null;
  }

  return (
    <>
      <SubTitle title="후기" />
      <ReviewForm
        user={user}
        group={group}
        fields={studyReviewFields}
        onChangeReview={onChangeReviewFields}
        onSubmit={onSubmitReview}
      />
      <ReviewList
        reviews={group.reviews ? group.reviews : []}
      />
    </>
  );
};

export default ReviewFormContainer;

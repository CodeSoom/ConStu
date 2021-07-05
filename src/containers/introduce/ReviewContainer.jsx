import React, { useState, useCallback } from 'react';

import _ from 'lodash';

import { useInterval } from 'react-use';
import { useSelector, useDispatch } from 'react-redux';

import {
  getAuth, getGroup, isCheckedTimeStatus, changeDateToTime,
} from '../../util/utils';
import { setStudyReview, deleteStudyReview } from '../../reducers/groupSlice';

import SubTitle from '../../styles/SubTitle';

import ReviewForm from '../../components/introduce/ReviewForm';
import ReviewList from '../../components/introduce/ReviewList';

const initFieldsState = {
  rating: 3,
  content: '',
};

const ReviewFormContainer = () => {
  const [error, setError] = useState(false);
  const [realTime, setRealTime] = useState(Date.now());
  const [reviewFields, setReviewFields] = useState(initFieldsState);

  const dispatch = useDispatch();

  const user = useSelector(getAuth('user'));
  const group = useSelector(getGroup('group'));

  useInterval(() => setRealTime(Date.now()), 1000);

  const onChangeFields = useCallback(({ name, value }) => {
    setError(false);

    setReviewFields({
      ...reviewFields,
      [name]: value,
    });
  }, [reviewFields]);

  const onSubmitReview = useCallback(() => {
    const { content } = reviewFields;

    if (!_.trim(content)) {
      setError(true);
      return;
    }

    dispatch(setStudyReview({
      id: user,
      ...reviewFields,
    }));

    setReviewFields(initFieldsState);
  }, [dispatch, user, reviewFields]);

  const onDeleteReview = useCallback((reviewId) => {
    dispatch(deleteStudyReview(reviewId));
  }, [dispatch]);

  const hasPermissionAboutWriteReview = useCallback(() => {
    const { participants, reviews } = group;

    return !(!participants.some(({ id, confirm }) => id === user && confirm && confirm === true)
      || reviews.some(({ id }) => id && id === user));
  }, [group, user]);

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
        error={error}
        fields={reviewFields}
        onChange={onChangeFields}
        onSubmit={onSubmitReview}
        hasPermission={hasPermissionAboutWriteReview()}
      />
      <ReviewList
        user={user}
        reviews={group.reviews}
        onDelete={onDeleteReview}
      />
    </>
  );
};

export default ReviewFormContainer;

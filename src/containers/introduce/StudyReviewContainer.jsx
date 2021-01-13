import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { useInterval } from 'react-use';

import { getAuth, getGroup } from '../../util/utils';

import StudyReviewForm from '../../components/introduce/StudyReviewForm';

const StudyReviewContainer = () => {
  const [realTime, setRealTime] = useState(Date.now());

  const group = useSelector(getGroup('group'));
  const user = useSelector(getAuth('user'));

  useInterval(() => {
    setRealTime(Date.now());
  }, 1000);

  if (!group) {
    return null;
  }

  return (
    <StudyReviewForm
      user={user}
      group={group}
      time={realTime}
    />
  );
};

export default StudyReviewContainer;

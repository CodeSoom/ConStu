import React, { useCallback, useEffect, useState } from 'react';

import { useInterval } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';

import { get } from '../../util/utils';
import { loadStudyGroup, updateStudyGroup } from '../../reducers/slice';

import StudyIntroduceForm from '../../components/introduce/StudyIntroduceForm';

const IntroduceContainer = ({ groupId }) => {
  const [realTime, setRealTime] = useState(Date.now());

  const dispatch = useDispatch();

  const group = useSelector(get('group'));
  const user = useSelector(get('user'));

  useEffect(() => {
    dispatch(loadStudyGroup(groupId));
  }, [dispatch, groupId]);

  useInterval(() => {
    setRealTime(Date.now());
  }, 1000);

  const onApplyStudy = useCallback(() => {
    if (user) {
      dispatch(updateStudyGroup());
    }
  }, [dispatch, user]);

  if (!group) {
    return (
      <div>로딩중..</div>
    );
  }

  return (
    <StudyIntroduceForm
      user={user}
      group={group}
      realTime={realTime}
      onApply={onApplyStudy}
    />
  );
};

export default IntroduceContainer;

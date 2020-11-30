import React, { useEffect, useState } from 'react';

import { useInterval } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';

import { get } from '../../util/utils';
import { loadStudyGroup } from '../../reducers/slice';

import StudyIntroduceForm from '../../components/introduce/StudyIntroduceForm';

const IntroduceContainer = ({ groupId }) => {
  const [realTime, setRealTime] = useState(Date.now());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStudyGroup(groupId));
  }, []);

  const group = useSelector(get('group'));

  useInterval(() => {
    setRealTime(Date.now());
  }, 1000);

  if (!group) {
    return (
      <div>로딩중..</div>
    );
  }

  return (
    <StudyIntroduceForm
      group={group}
      realTime={realTime}
    />
  );
};

export default IntroduceContainer;

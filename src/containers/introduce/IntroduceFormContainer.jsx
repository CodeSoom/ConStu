import React, { useState } from 'react';

import { useInterval } from 'react-use';
import { useSelector } from 'react-redux';

import { getGroup } from '../../util/utils';

import StudyIntroduceForm from '../../components/introduce/StudyIntroduceForm';

const IntroduceFormContainer = () => {
  const [realTime, setRealTime] = useState(Date.now());

  const group = useSelector(getGroup('group'));

  useInterval(() => {
    setRealTime(Date.now());
  }, 1000);

  if (!group) {
    return null;
  }

  return (
    <StudyIntroduceForm
      group={group}
      realTime={realTime}
    />
  );
};

export default React.memo(IntroduceFormContainer);

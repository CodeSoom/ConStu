import React, { useState } from 'react';

import { useInterval } from 'react-use';
import { useSelector } from 'react-redux';

import { getGroup } from '../../util/utils';

import IntroduceForm from '../../components/introduce/IntroduceForm';

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
    <IntroduceForm
      group={group}
      realTime={realTime}
    />
  );
};

export default React.memo(IntroduceFormContainer);

import React, { useState } from 'react';

import { useInterval } from 'react-use';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAuth, getGroup } from '../../util/utils';

import IntroduceForm from '../../components/introduce/IntroduceForm';
import { deleteGroup } from '../../reducers/groupSlice';

const IntroduceFormContainer = () => {
  const [realTime, setRealTime] = useState(Date.now());

  const history = useHistory();
  const dispatch = useDispatch();

  const group = useSelector(getGroup('group'));
  const user = useSelector(getAuth('user'));

  useInterval(() => {
    setRealTime(Date.now());
  }, 1000);

  const onRemove = (id) => {
    dispatch(deleteGroup(id));

    history.push('/');
  };

  if (!group) {
    return null;
  }

  return (
    <IntroduceForm
      user={user}
      group={group}
      realTime={realTime}
      onRemove={onRemove}
    />
  );
};

export default React.memo(IntroduceFormContainer);

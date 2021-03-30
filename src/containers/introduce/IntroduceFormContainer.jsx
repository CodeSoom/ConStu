import React, { useState } from 'react';

import { useInterval } from 'react-use';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAuth, getGroup } from '../../util/utils';

import { deleteGroup, setOriginalArticle } from '../../reducers/groupSlice';

import IntroduceForm from '../../components/introduce/IntroduceForm';

const IntroduceFormContainer = () => {
  const [realTime, setRealTime] = useState(Date.now());

  const history = useHistory();
  const dispatch = useDispatch();

  const group = useSelector(getGroup('group'));
  const user = useSelector(getAuth('user'));

  useInterval(() => setRealTime(Date.now()), 1000);

  const onRemove = (id) => {
    dispatch(deleteGroup(id));

    history.push('/');
  };

  const onEdit = () => {
    dispatch(setOriginalArticle(group));

    history.push('/write');
  };

  if (!group) {
    return null;
  }

  return (
    <IntroduceForm
      user={user}
      group={group}
      realTime={realTime}
      onEdit={onEdit}
      onRemove={onRemove}
    />
  );
};

export default React.memo(IntroduceFormContainer);

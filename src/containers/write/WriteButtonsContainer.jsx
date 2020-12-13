import React, { useEffect, useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAuth, getGroup } from '../../util/utils';
import { writeStudyGroup } from '../../reducers/groupSlice';

import WriteButtons from '../../components/write/WriteButtons';

const WriteButtonsContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const writeField = useSelector(getGroup('writeField'));
  const groupId = useSelector(getGroup('groupId'));
  const user = useSelector(getAuth('user'));

  useEffect(() => {
    if (!user) {
      history.push('/');
    }
  }, [user, history]);

  const onSubmit = () => {
    dispatch(writeStudyGroup());
  };

  useEffect(() => {
    if (groupId) {
      history.push(`/introduce/${groupId}`);
    }
  }, [history, groupId]);

  const onCancel = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <WriteButtons
      fields={writeField}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export default WriteButtonsContainer;

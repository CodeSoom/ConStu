import React, { useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { get } from '../../util/utils';
import { writeStudyGroup } from '../../reducers/slice';

import WriteButtons from '../../components/write/WriteButtons';

const WriteButtonsContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const writeField = useSelector(get('writeField'));
  const groupId = useSelector(get('groupId'));

  const onSubmit = useCallback(() => {
    // TODO: write form validate 체크 하기
    dispatch(writeStudyGroup());
  }, [dispatch]);

  useEffect(() => {
    if (groupId) {
      history.push(`/introduce/${groupId}`);
    }
  }, [history, groupId]);

  const onCancel = () => {
    history.push('/');
  };

  return (
    <WriteButtons
      fields={writeField}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export default WriteButtonsContainer;

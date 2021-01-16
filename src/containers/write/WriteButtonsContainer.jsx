import React, { useEffect, useCallback } from 'react';

import { useUnmount } from 'react-use';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAuth, getGroup } from '../../util/utils';
import { clearWriteFields, editStudyGroup, writeStudyGroup } from '../../reducers/groupSlice';

import WriteButtons from '../../components/write/WriteButtons';

const WriteButtonsContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(getAuth('user'));
  const groupId = useSelector(getGroup('groupId'));
  const groupError = useSelector(getGroup('groupError'));
  const writeField = useSelector(getGroup('writeField'));
  const originalArticleId = useSelector(getGroup('originalArticleId'));

  useEffect(() => {
    if (!user) {
      history.push('/');
    }
  }, [user, history]);

  const onSubmit = () => {
    if (originalArticleId) {
      dispatch(editStudyGroup(originalArticleId));
      return;
    }

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

  useUnmount(() => dispatch(clearWriteFields()));

  return (
    <WriteButtons
      fields={writeField}
      onSubmit={onSubmit}
      onCancel={onCancel}
      groupError={groupError}
      isEdit={!!originalArticleId}
    />
  );
};

export default WriteButtonsContainer;

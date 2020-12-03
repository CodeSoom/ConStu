import React, { useEffect, useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ERROR_MESSAGE } from '../../util/messages';
import { getAuth, getGroup, isCheckValidate } from '../../util/utils';
import { writeStudyGroup } from '../../reducers/groupSlice';

import WriteButtons from '../../components/write/WriteButtons';

const isCheckApplyEndDate = (applyDate) => Date.now() - applyDate >= 0;

const {
  NO_INPUT, NO_TAG, FAST_APPLY_DEADLINE, NO_LOGGED_IN,
} = ERROR_MESSAGE;

const WriteButtonsContainer = () => {
  const [error, setError] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const writeField = useSelector(getGroup('writeField'));
  const groupId = useSelector(getGroup('groupId'));
  const user = useSelector(getAuth('user'));

  const {
    title, applyEndDate, personnel, tags,
  } = writeField;

  const applyEndTime = new Date(applyEndDate).getTime();

  const onSubmit = () => {
    // TODO: 모달창으로 처리 후 redirection 시키기?
    if (!user) {
      setError(NO_LOGGED_IN);
      return;
    }

    if (isCheckValidate([title, applyEndDate, personnel])) {
      setError(NO_INPUT);
      return;
    }

    if (!tags.length) {
      setError(NO_TAG);
      return;
    }

    if (isCheckApplyEndDate(applyEndTime)) {
      setError(FAST_APPLY_DEADLINE);
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

  return (
    <WriteButtons
      error={error}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export default WriteButtonsContainer;

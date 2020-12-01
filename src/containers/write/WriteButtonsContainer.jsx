import React, { useEffect, useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ERROR_MESSAGE } from '../../util/messages';
import { get, isCheckValidate } from '../../util/utils';
import { writeStudyGroup } from '../../reducers/slice';

import WriteButtons from '../../components/write/WriteButtons';

const isCheckApplyEndDate = (applyDate) => Date.now() - applyDate >= 0;

const { NO_INPUT, NO_TAG, FAST_APPLY_DEADLINE } = ERROR_MESSAGE;

const WriteButtonsContainer = () => {
  const [error, setError] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const writeField = useSelector(get('writeField'));
  const groupId = useSelector(get('groupId'));

  const {
    title, applyEndDate, personnel, tags,
  } = writeField;

  const applyEndTime = new Date(applyEndDate).getTime();

  const onSubmit = () => {
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

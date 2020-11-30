import React, { useEffect, useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { get } from '../../util/utils';
import { writeStudyGroup } from '../../reducers/slice';

import WriteButtons from '../../components/write/WriteButtons';

const checkTrim = (value) => value.trim();

const isCheckValidate = (values) => values.map(checkTrim).includes('');

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
      setError('입력이 안된 사항이 있습니다.');
      return;
    }

    if (!tags.length) {
      setError('태그를 입력하세요.');
      return;
    }

    if (Date.now() - applyEndTime >= 0) {
      setError('접수 마감날짜가 현재 시간보다 빠릅니다.');
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

import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import qs from 'qs';

import { get } from '../../util/utils';
import useInterval from '../../util/useInterval';
import { loadStudyGroups } from '../../reducers/slice';

import StudyGroups from '../../components/main/StudyGroups';

const StudyGroupsContainer = () => {
  const { search } = useLocation();
  const [realTime, setRealTime] = useState(Date.now());

  const dispatch = useDispatch();

  const groups = useSelector(get('groups'));

  useInterval(() => {
    setRealTime(Date.now());
  }, 1000);

  useEffect(() => {
    const { tag } = qs.parse(search, {
      ignoreQueryPrefix: true,
    });

    dispatch(loadStudyGroups(tag));
  }, [dispatch, search]);

  if (!groups || !groups.length) {
    return <div>스터디가 존재하지 않습니다.</div>;
  }

  return (
    <StudyGroups
      groups={groups}
      realTime={realTime}
    />
  );
};

export default StudyGroupsContainer;

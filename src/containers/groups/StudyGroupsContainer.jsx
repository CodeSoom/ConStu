import React, { useEffect, useState } from 'react';

import { useInterval } from 'react-use';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import qs from 'qs';

import { getAuth, getGroup } from '../../util/utils';
import { loadStudyGroups } from '../../reducers/groupSlice';

import StudyGroups from '../../components/main/StudyGroups';

const StudyGroupsContainer = () => {
  const { search } = useLocation();
  const [realTime, setRealTime] = useState(Date.now());

  const dispatch = useDispatch();

  const groups = useSelector(getGroup('groups'));
  const user = useSelector(getAuth('user'));

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
      user={user}
      groups={groups}
      realTime={realTime}
    />
  );
};

export default React.memo(StudyGroupsContainer);

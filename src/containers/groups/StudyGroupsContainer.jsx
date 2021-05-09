import React, { useEffect, useState, useCallback } from 'react';

import { useInterval } from 'react-use';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useMediaQuery } from 'react-responsive';

import qs from 'qs';

import _ from 'lodash';

import { getAuth, getGroup, getCommon } from '../../util/utils';

import { changeTheme } from '../../reducers/commonSlice';
import { loadStudyGroups } from '../../reducers/groupSlice';

import StudyGroups from '../../components/main/StudyGroups';
import ResponsiveGroupsContentLoader from '../../components/loader/ResponsiveGroupsContentLoader';

const StudyGroupsContainer = () => {
  const { search } = useLocation();
  const [realTime, setRealTime] = useState(Date.now());
  const [tagState, setTagState] = useState(null);

  const dispatch = useDispatch();

  const groups = useSelector(getGroup('groups'));
  const user = useSelector(getAuth('user'));
  const theme = useSelector(getCommon('theme'));

  useInterval(() => setRealTime(Date.now()), 1000);

  useEffect(() => {
    const { tag } = qs.parse(search, {
      ignoreQueryPrefix: true,
    });

    setTagState(tag);
    dispatch(loadStudyGroups(tag));
  }, [dispatch, search]);

  const onChangeTheme = useCallback(() => {
    dispatch(changeTheme());
  }, [dispatch]);

  const isDesktop = useMediaQuery({
    query: '(min-width: 1150px)',
  });

  const isMobile = useMediaQuery({
    query: '(min-width: 960px)',
  });

  if (!tagState && _.isEmpty(groups)) {
    return (
      <ResponsiveGroupsContentLoader
        isDesktop={isDesktop}
        isMobile={isMobile}
      />
    );
  }

  return (
    <StudyGroups
      user={user}
      theme={theme}
      groups={groups}
      realTime={realTime}
      onChangeTheme={onChangeTheme}
    />
  );
};

export default React.memo(StudyGroupsContainer);

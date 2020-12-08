import React, { useCallback, useEffect, useState } from 'react';

import { useInterval } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';

import { getAuth, getGroup } from '../../util/utils';
import { deleteParticipant, loadStudyGroup, updateParticipant } from '../../reducers/groupSlice';

import StudyIntroduceForm from '../../components/introduce/StudyIntroduceForm';
import GroupContentLoader from '../../components/introduce/GroupsContentLoader';
import IntroduceHeader from '../../components/introduce/IntroduceHeader';

const IntroduceContainer = ({ groupId }) => {
  const [realTime, setRealTime] = useState(Date.now());

  const dispatch = useDispatch();

  const group = useSelector(getGroup('group'));
  const user = useSelector(getAuth('user'));

  useEffect(() => {
    dispatch(loadStudyGroup(groupId));
  }, [dispatch, groupId]);

  useInterval(() => {
    setRealTime(Date.now());
  }, 1000);

  const onApplyStudy = useCallback(() => {
    dispatch(updateParticipant());
  }, [dispatch]);

  const onApplyCancel = useCallback(() => {
    if (user) {
      dispatch(deleteParticipant());
    }
  }, [dispatch, user]);

  if (!group) {
    return (
      <GroupContentLoader />
    );
  }

  return (
    <>
      <IntroduceHeader
        user={user}
        group={group}
        realTime={realTime}
        onApply={onApplyStudy}
        onApplyCancel={onApplyCancel}
      />
      <StudyIntroduceForm
        group={group}
        realTime={realTime}
      />
    </>
  );
};

export default React.memo(IntroduceContainer);

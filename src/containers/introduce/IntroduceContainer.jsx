import React, { useCallback, useEffect, useState } from 'react';

import { useInterval } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';

import { getAuth, getGroup } from '../../util/utils';
import {
  changeApplyFields, deleteParticipant, loadStudyGroup, updateParticipant,
} from '../../reducers/groupSlice';

import StudyIntroduceForm from '../../components/introduce/StudyIntroduceForm';
import GroupContentLoader from '../../components/introduce/GroupsContentLoader';
import IntroduceHeader from '../../components/introduce/IntroduceHeader';

const IntroduceContainer = ({ groupId }) => {
  const [realTime, setRealTime] = useState(Date.now());

  const dispatch = useDispatch();

  const applyFields = useSelector(getGroup('applyFields'));
  const group = useSelector(getGroup('group'));
  const user = useSelector(getAuth('user'));

  useEffect(() => {
    dispatch(loadStudyGroup(groupId));
  }, [dispatch, groupId]);

  useInterval(() => {
    setRealTime(Date.now());
  }, 1000);

  const onApplyStudy = useCallback(({ reason, wantToGet }) => {
    dispatch(updateParticipant({ reason, wantToGet }));
  }, [dispatch]);

  const onApplyCancel = useCallback(() => {
    dispatch(deleteParticipant());
  }, [dispatch]);

  const onChangeApplyFields = useCallback(({ name, value }) => {
    dispatch(changeApplyFields({ name, value }));
  }, [dispatch]);

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
        applyFields={applyFields}
        onApply={onApplyStudy}
        onApplyCancel={onApplyCancel}
        onChangeApplyFields={onChangeApplyFields}
      />
      <StudyIntroduceForm
        group={group}
        realTime={realTime}
      />
    </>
  );
};

export default React.memo(IntroduceContainer);

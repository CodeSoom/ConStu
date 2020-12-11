import React, { useCallback, useState } from 'react';

import { useInterval } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';

import { getAuth, getGroup } from '../../util/utils';
import {
  changeApplyFields, clearApplyFields, deleteParticipant, updateParticipant,
} from '../../reducers/groupSlice';

import IntroduceHeader from '../../components/introduce/IntroduceHeader';
import ApplicantViewButton from '../../components/introduce/ApplicantViewButton';
import ModeratorViewButton from '../../components/introduce/ModeratorViewButton';
import GroupContentLoader from '../../components/introduce/GroupsContentLoader';

const IntroduceHeaderContainer = () => {
  const [realTime, setRealTime] = useState(Date.now());

  const dispatch = useDispatch();

  const user = useSelector(getAuth('user'));
  const group = useSelector(getGroup('group'));
  const applyFields = useSelector(getGroup('applyFields'));

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

  const clearApplyForm = useCallback(() => {
    dispatch(clearApplyFields());
  }, [dispatch]);

  if (!group) {
    return (
      <GroupContentLoader />
    );
  }

  return (
    <IntroduceHeader group={group}>
      <ApplicantViewButton
        user={user}
        group={group}
        realTime={realTime}
        applyFields={applyFields}
        onApply={onApplyStudy}
        onApplyCancel={onApplyCancel}
        clearForm={clearApplyForm}
        onChangeApplyFields={onChangeApplyFields}
      />
      <ModeratorViewButton
        user={user}
        group={group}
      />
    </IntroduceHeader>
  );
};

export default React.memo(IntroduceHeaderContainer);
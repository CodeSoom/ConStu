import React, { useCallback, useState } from 'react';

import { useInterval } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';

import { useMediaQuery } from 'react-responsive';

import { getAuth, getGroup } from '../../util/utils';
import { deleteParticipant, updateConfirmParticipant, updateParticipant } from '../../reducers/groupSlice';

import IntroduceHeader from '../../components/introduce/IntroduceHeader';
import ApplicantViewButton from '../../components/introduce/ApplicantViewButton';
import ModeratorViewButton from '../../components/introduce/ModeratorViewButton';
import ResponsiveGroupContentLoader from '../../components/loader/ResponsiveGroupContentLoader';

const IntroduceHeaderContainer = () => {
  const [realTime, setRealTime] = useState(Date.now());

  const dispatch = useDispatch();

  const isDesktop = useMediaQuery({
    minWidth: 451,
  });

  const isMobile = useMediaQuery({
    maxWidth: 450,
  });

  const user = useSelector(getAuth('user'));
  const group = useSelector(getGroup('group'));

  useInterval(() => setRealTime(Date.now()), 1000);

  const onApplyStudy = useCallback((formData) => {
    dispatch(updateParticipant(formData));
  }, [dispatch]);

  const onApplyCancel = useCallback(() => {
    dispatch(deleteParticipant());
  }, [dispatch]);

  const onUpdateConfirmParticipant = useCallback((id) => {
    dispatch(updateConfirmParticipant(id));
  }, [dispatch]);

  if (!group) {
    return (
      <ResponsiveGroupContentLoader
        isMobile={isMobile}
        isDesktop={isDesktop}
      />
    );
  }

  return (
    <IntroduceHeader title={group?.title}>
      <ApplicantViewButton
        user={user}
        group={group}
        realTime={realTime}
        onApply={onApplyStudy}
        onApplyCancel={onApplyCancel}
      />
      <ModeratorViewButton
        user={user}
        group={group}
        realTime={realTime}
        onUpdateConfirm={onUpdateConfirmParticipant}
      />
    </IntroduceHeader>
  );
};

export default React.memo(IntroduceHeaderContainer);

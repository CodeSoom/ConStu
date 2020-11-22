import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { get } from '../../util/utils';
import { loadStudyGroup } from '../../reducers/slice';

import StudyIntroduceForm from '../../components/introduce/StudyIntroduceForm';

const IntroduceContainer = ({ groupId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStudyGroup(groupId));
  }, []);

  const group = useSelector(get('group'));

  if (!group) {
    return (
      <div>로딩중..</div>
    );
  }

  return (
    <StudyIntroduceForm group={group} />
  );
};

export default IntroduceContainer;

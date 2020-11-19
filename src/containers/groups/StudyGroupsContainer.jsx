import React from 'react';

import { useSelector } from 'react-redux';

import StudyGroups from '../../components/main/StudyGroups';
import { get } from '../../../utils';

const StudyGroupsContainer = () => {
  const groups = useSelector(get('groups'));

  if (!groups || !groups.length) {
    return <div>스터디가 존재하지 않습니다.</div>;
  }

  return (
    <StudyGroups groups={groups} />
  );
};

export default StudyGroupsContainer;

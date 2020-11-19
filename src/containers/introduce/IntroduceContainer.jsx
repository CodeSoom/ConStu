import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import { loadStudyGroup } from '../../reducers/slice';
import { get } from '../../../utils';
import StudyIntroduceForm from '../../components/introduce/StudyIntroduceForm';

const IntroduceContainerWrapper = styled.div``;

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
    <IntroduceContainerWrapper>
      <StudyIntroduceForm group={group} />
    </IntroduceContainerWrapper>
  );
};

export default IntroduceContainer;

import React from 'react';

import TagFormContainer from '../containers/write/TagsFormContainer';
import WriteButtonsContainer from '../containers/write/WriteButtonsContainer';
import WriteFormContainer from '../containers/write/WriteFormContainer';

import Responsive from '../styles/Responsive';

const IntroducePage = () => (
  <Responsive>
    <h1>스터디 그룹 개설하기</h1>
    <WriteFormContainer />
    <TagFormContainer />
    <WriteButtonsContainer />
  </Responsive>
);
export default IntroducePage;

import React from 'react';

import TagFormContainer from '../containers/write/TagsFormContainer';
import WriteButtonsContainer from '../containers/write/WriteButtonsContainer';
import WriteEditorContainer from '../containers/write/WriteEditorContainer';
import WriteFormContainer from '../containers/write/WriteFormContainer';

import Responsive from '../styles/Responsive';

const IntroducePage = () => (
  <Responsive>
    <h1>스터디 그룹 개설하기</h1>
    <WriteFormContainer />
    <WriteEditorContainer />
    <TagFormContainer />
    <WriteButtonsContainer />
  </Responsive>
);
export default IntroducePage;

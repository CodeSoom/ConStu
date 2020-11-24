import React from 'react';

import TagFormContainer from '../containers/write/TagsFormContainer';
import WriteFormContainer from '../containers/write/WriteFormContainer';

import Responsive from '../styles/Responsive';

const IntroducePage = () => (
  <Responsive>
    <h1>스터디 그룹 개설하기</h1>
    <WriteFormContainer />
    <TagFormContainer />
    <div>
      <button type="button">저장</button>
    </div>
  </Responsive>
);
export default IntroducePage;

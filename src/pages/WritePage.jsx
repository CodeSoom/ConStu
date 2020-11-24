import React from 'react';

import TagFormContainer from '../containers/write/TagsFormContainer';

import Responsive from '../styles/Responsive';

const IntroducePage = () => (
  <Responsive>
    <h1>스터디 그룹 개설하기</h1>
    <div>
      <input type="text" placeholder="제목을 입력하세요" />
    </div>
    <div>
      <span>모집 마감 날짜</span>
      <input type="date" />
    </div>
    <div>
      <span>참여 인원 수</span>
      <input type="number" />
    </div>
    <div>
      <textarea rows="10" cols="100" placeholder="내용" />
    </div>
    <TagFormContainer />
    <div>
      <button type="button">저장</button>
    </div>
  </Responsive>
);
export default IntroducePage;

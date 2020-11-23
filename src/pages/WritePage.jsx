import React from 'react';

import Responsive from '../styles/Responsive';

const IntroducePage = () => (
  <Responsive>
    <h1>스터디 그룹 개설하기</h1>
    <div>
      <input type="text" placeholder="제목을 입력하세요" />
    </div>
    <div>
      <textarea rows="10" cols="100" placeholder="내용" />
    </div>
    <div>
      <input type="text" placeholder="태그를 입력하세요" />
    </div>
    <div>
      <button type="button">저장</button>
    </div>
  </Responsive>
);
export default IntroducePage;

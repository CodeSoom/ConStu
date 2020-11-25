import React from 'react';

import styled from '@emotion/styled';

const WriteButtonsWrapper = styled.div``;

const WriteButtons = ({ onSubmit }) => (
  <WriteButtonsWrapper>
    <button
      type="button"
      onClick={onSubmit}
    >
      등록하기
    </button>
    <button type="button">취소</button>
  </WriteButtonsWrapper>
);

export default WriteButtons;

import React from 'react';

import styled from '@emotion/styled';

const WriteFormWrapper = styled.div``;

const WriteForm = ({ onChange, fields }) => {
  const {
    title, applyEndDate, personnel, contents,
  } = fields;

  const handleChange = (e) => {
    const { name, value } = e.target;

    onChange({ name, value });
  };

  return (
    <WriteFormWrapper>
      <div>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="제목을 입력하세요"
        />
      </div>
      <div>
        <label htmlFor="application-deadline">모집 마감 날짜</label>
        <input
          type="date"
          name="applyEndDate"
          value={applyEndDate}
          onChange={handleChange}
          id="application-deadline"
        />
      </div>
      <div>
        <label htmlFor="participants-number">참여 인원 수</label>
        <input
          type="number"
          name="personnel"
          value={personnel}
          onChange={handleChange}
          id="participants-number"
        />
      </div>
      <div>
        {/* TODO: 추후 draft.js를 사용하여 변경 예정 */}
        <textarea
          rows="10"
          cols="100"
          name="contents"
          value={contents}
          onChange={handleChange}
          placeholder="내용"
        />
      </div>
    </WriteFormWrapper>
  );
};

export default WriteForm;

import React from 'react';

import styled from '@emotion/styled';

import palette from '../../styles/palette';

const WriteFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WriteTitleInputWrapper = styled.input`
  width: 100%;
  font-size: 2.75rem;
  font-weight: bold;
  color: ${palette.gray[7]};
  line-height: 1.5;
`;

const DateInputWrapper = styled.input`
  margin-left: 0.5rem;
  padding: 0.5rem;
  border-bottom: 2px solid ${palette.gray[5]};
  font-size: 1rem;
  width: fit-content;
  &:focus, &:hover{
    border-bottom: 2px solid ${palette.gray[7]};
  }
`;

const NumberInputWrapper = styled.input`
  margin-left: 0.5rem;
  padding: 0.5rem;
  border-bottom: 2px solid ${palette.gray[5]};
  font-size: 1rem;
  width: 50px;
  &:focus, &:hover{
    border-bottom: 2px solid ${palette.gray[7]};
  }
`;

const SpaceWrapper = styled.div`
  background: ${palette.violet[3]};
  height: 6px;
  width: 8rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 1px;
`;

const LabelWrapper = styled.label`
  font-size: 1.3rem;
  font-weight: bold;
  margin-right: 1rem;
  color: ${palette.gray[7]};
  ::before {
    content: '*';
    display: inline-block;
    vertical-align: top;
    font-weight: 400;
    color: ${palette.warn[1]};
    margin: 0 0.125rem 0 0;
    font-size: 1.25rem;
    line-height: 1.25rem;
  }
`;

const WriteDivBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const WriteForm = ({ onChange, fields }) => {
  const {
    title, applyEndDate, personnel,
  } = fields;

  const handleChange = (e) => {
    const { name, value } = e.target;

    onChange({ name, value });
  };

  return (
    <WriteFormWrapper>
      <WriteTitleInputWrapper
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="제목을 입력하세요"
      />
      <SpaceWrapper />
      <WriteDivBlock>
        <LabelWrapper htmlFor="application-deadline">모집 마감 날짜</LabelWrapper>
        <DateInputWrapper
          type="datetime-local"
          name="applyEndDate"
          value={applyEndDate}
          onChange={handleChange}
          id="application-deadline"
        />
      </WriteDivBlock>
      <WriteDivBlock>
        <LabelWrapper htmlFor="participants-number">참여 인원 수</LabelWrapper>
        <NumberInputWrapper
          min="1"
          type="number"
          name="personnel"
          value={personnel}
          onChange={handleChange}
          id="participants-number"
        />
      </WriteDivBlock>
    </WriteFormWrapper>
  );
};

export default WriteForm;

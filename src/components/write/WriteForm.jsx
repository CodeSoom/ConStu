import React from 'react';

import styled from '@emotion/styled';

import { toStringEndDateFormat } from '../../util/utils';

import palette from '../../styles/palette';

const WriteFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WriteTitleInputWrapper = styled.input`
  font-size: 2.75rem;
  font-weight: bold;
  width: 100%;
  line-height: 1.5;
  color: ${palette.gray[7]};
`;

const DateInputWrapper = styled.input`
  font-size: 1rem;
  margin-left: 0.5rem;
  padding: 0.5rem;
  border-bottom: 2px solid ${palette.gray[5]};
  width: fit-content;

  &:focus, &:hover {
    border-bottom: 2px solid ${palette.gray[7]};
  }
`;

const NumberInputWrapper = styled.input`
  font-size: 1rem;
  margin-left: 0.5rem;
  padding: 0.5rem;
  border-bottom: 2px solid ${palette.gray[5]};
  width: 50px;

  &:focus, &:hover {
    border-bottom: 2px solid ${palette.gray[7]};
  }
`;

const SpaceWrapper = styled.div`
  width: 8rem;
  height: 6px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 1px;
  background: ${palette.violet[3]};
`;

const LabelWrapper = styled.label`
  font-size: 1.3rem;
  font-weight: bold;
  margin-right: 1rem;
  color: ${palette.gray[7]};

  ::before {
    content: '*';
    font-weight: 400;
    font-size: 1.25rem;
    display: inline-block;
    vertical-align: top;
    margin: 0 0.125rem 0 0;
    line-height: 1.25rem;
    color: ${palette.warn[1]};
  }
`;

const WriteDivBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const WriteForm = ({ onChange, fields }) => {
  const { title, applyEndDate, personnel } = fields;

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
          value={toStringEndDateFormat(applyEndDate)}
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

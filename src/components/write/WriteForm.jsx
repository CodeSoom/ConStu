import React from 'react';

import styled from '@emotion/styled';

import ReactDatePicker from 'react-datepicker';

import palette from '../../styles/palette';

import { yesterday } from '../../util/utils';

import '../../assets/css/react-datepicker.css';

const WriteFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WriteTitleInputWrapper = styled.input`
  font-size: 2.75rem;
  font-weight: bold;
  font-family: 'Nanum Gothic', sans-serif;
  width: 100%;
  line-height: 1.5;
  color: ${palette.gray[8]};

  &::placeholder {
    color: ${palette.gray[6]};
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
  font-weight: lighter;
  width: fit-content;
  color: ${palette.gray[7]};
  margin-right: 1rem;

  ::before {
    content: '*';
    font-weight: 400;
    font-size: 1.25rem;
    display: inline-block;
    vertical-align: top;
    margin: 0 0.125rem 0 0;
    line-height: 1.25rem;
    color: ${palette.warn[2]};
  }
`;

const WriteDivBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const CustomReactDatePicker = styled(ReactDatePicker)`
  font-size: 1rem;
  margin-left: 0.5rem;
  padding: 0.5rem;
  border-bottom: 2px solid ${palette.gray[5]};

  &:focus, &:hover {
    border-bottom: 2px solid ${palette.gray[7]};
  }
`;

const WriteForm = ({ onChange, fields }) => {
  const { title, applyEndDate, personnel } = fields;

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    onChange({ name, value });
  };

  const dateChange = (date) => onChange({
    name: 'applyEndDate',
    value: date.toString(),
  });

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
        <LabelWrapper htmlFor="application-deadline">
          모집 마감 날짜
        </LabelWrapper>
        <CustomReactDatePicker
          showTimeSelect
          minDate={yesterday}
          onChange={(date) => dateChange(date)}
          selected={applyEndDate ? new Date(applyEndDate) : new Date()}
          filterTime={filterPassedTime}
          id="application-deadline"
          dateFormat="yyyy-MM-dd hh:mm aa"
        />
      </WriteDivBlock>
      <WriteDivBlock>
        <LabelWrapper htmlFor="participants-number">
          참여 인원 수
        </LabelWrapper>
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

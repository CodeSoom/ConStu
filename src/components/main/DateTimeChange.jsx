import React, { useState } from 'react';

import styled from '@emotion/styled';

import useInterval from '../../util/useInterval';

import DateTimeStatus from '../../styles/DateTimeStatus';

const DateTimeChangeWrapper = styled.div``;

const isCheckedTimeStatus = ({
  realTime, applyEndTime, participants, personnel,
}) => (!!((realTime - applyEndTime >= 0 || participants.length === personnel)));

const DateTimeChange = ({ group }) => {
  const { participants, personnel, applyEndDate } = group;
  const applyEndTime = new Date(applyEndDate).getTime();

  const [realTime, setRealTime] = useState(Date.now());

  useInterval(() => {
    setRealTime(Date.now());
  }, 1000);

  const valid = {
    realTime, applyEndTime, participants, personnel,
  };

  const timeStatusChange = () => {
    if (isCheckedTimeStatus(valid)) {
      return (
        <DateTimeStatus status="deadline">모집마감</DateTimeStatus>
      );
    }

    return (
      <DateTimeStatus status="recruit">모집중</DateTimeStatus>
    );
  };

  return (
    <DateTimeChangeWrapper>
      {`모집 인원: ${participants.length} / ${personnel}`}
      {timeStatusChange()}
    </DateTimeChangeWrapper>
  );
};

export default DateTimeChange;

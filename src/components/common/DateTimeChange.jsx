import React, { useState } from 'react';

import styled from '@emotion/styled';

import 'moment/locale/ko';
import moment from 'moment';
import Moment from 'react-moment';

import useInterval from '../../util/useInterval';

import DateTimeStatus from '../../styles/DateTimeStatus';

moment.locale('ko');

const DateTimeChangeWrapper = styled.div`
  margin-top: .2rem;
`;

const isCheckedTimeStatus = ({
  realTime, applyEndTime, participants, personnel,
}) => (!!((realTime - applyEndTime >= 0 || participants.length === personnel)));

const DateTimeChange = ({ group, page }) => {
  const { participants, personnel, applyEndDate } = group;
  const applyEndTime = new Date(applyEndDate).getTime();

  const [realTime, setRealTime] = useState(Date.now());

  useInterval(() => {
    setRealTime(Date.now());
  }, 1000);

  const valid = {
    realTime, applyEndTime, participants, personnel,
  };

  const mainTimeStatus = () => {
    if (isCheckedTimeStatus(valid)) {
      return (
        <DateTimeStatus status="mainDeadline">모집마감</DateTimeStatus>
      );
    }

    return (
      <DateTimeStatus status="mainRecruit">모집중</DateTimeStatus>
    );
  };

  const introduceTimeStatus = () => {
    if (isCheckedTimeStatus(valid)) {
      return (
        <DateTimeStatus status="introduceDeadline">
          모집마감
        </DateTimeStatus>
      );
    }

    return (
      <DateTimeStatus status="introduceRecruit">
        <Moment fromNow>{applyEndTime}</Moment>
        &nbsp;모집 마감
      </DateTimeStatus>
    );
  };

  return (
    <DateTimeChangeWrapper>
      {page === 'introduce'
        ? introduceTimeStatus()
        : (
          <>
            {`모집 인원: ${participants.length} / ${personnel}`}
            {mainTimeStatus()}
          </>
        )}
    </DateTimeChangeWrapper>
  );
};

export default DateTimeChange;

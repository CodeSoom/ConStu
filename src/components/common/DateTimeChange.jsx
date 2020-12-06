import React from 'react';

import styled from '@emotion/styled';

import 'moment/locale/ko';
import moment from 'moment';
import Moment from 'react-moment';

import { isCheckedTimeStatus } from '../../util/utils';

import DateTimeStatus from '../../styles/DateTimeStatus';

moment.locale('ko');

const DateTimeChangeWrapper = styled.div`
  margin-top: .2rem;
`;

const DateTimeChange = ({ group, page, time }) => {
  const { participants, personnel, applyEndDate } = group;

  const applyEndTime = new Date(applyEndDate).getTime();

  const valid = {
    time, applyEndTime, participants, personnel,
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
        <Moment fromNow style={{ fontFamily: 'Gamja Flower, cursive' }}>{applyEndTime}</Moment>
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

export default React.memo(DateTimeChange);

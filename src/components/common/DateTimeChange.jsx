import React from 'react';

import 'moment/locale/ko';
import moment from 'moment';
import Moment from 'react-moment';

import { authorizedUsersNumber, changeDateToTime, isCheckedTimeStatus } from '../../util/utils';

import DateTimeStatus from '../../styles/DateTimeStatus';

moment.locale('ko');

const DateTimeChange = ({ group, page, time }) => {
  const { participants, personnel, applyEndDate } = group;

  const applyEndTime = changeDateToTime(applyEndDate);

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
      <DateTimeStatus status="mainRecruit">
        <Moment fromNow style={{ fontFamily: 'Gamja Flower, cursive' }}>{applyEndTime}</Moment>
        &nbsp;모집 마감
      </DateTimeStatus>
    );
  };

  const introduceTimeStatus = () => {
    if (isCheckedTimeStatus(valid)) {
      return (
        <DateTimeStatus status="introduceDeadline">
          모집 마감
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
    <>
      {page === 'introduce'
        ? introduceTimeStatus()
        : (
          <>
            {`신청 현황: ${authorizedUsersNumber(participants)} / ${personnel}`}
            {mainTimeStatus()}
          </>
        )}
    </>
  );
};

export default React.memo(DateTimeChange);

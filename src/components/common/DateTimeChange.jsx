import React from 'react';

import 'moment/locale/ko';
import moment from 'moment';
import Moment from 'react-moment';

import { APPLY_STATUS } from '../../util/constants/constants';
import { authorizedUsersNumber, changeDateToTime, isCheckedTimeStatus } from '../../util/utils';

import DateTimeStatus from '../../styles/DateTimeStatus';

const { DEAD_LINE } = APPLY_STATUS;

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
        <DateTimeStatus status="mainDeadline">{DEAD_LINE}</DateTimeStatus>
      );
    }

    return (
      <DateTimeStatus status="mainRecruit">
        <Moment fromNow style={{ fontFamily: 'Gamja Flower, cursive' }}>{applyEndTime}</Moment>
        &nbsp;
        {DEAD_LINE}
      </DateTimeStatus>
    );
  };

  const introduceTimeStatus = () => {
    if (isCheckedTimeStatus(valid)) {
      return (
        <DateTimeStatus status="introduceDeadline">
          {DEAD_LINE}
        </DateTimeStatus>
      );
    }

    return (
      <DateTimeStatus status="introduceRecruit">
        <Moment fromNow style={{ fontFamily: 'Gamja Flower, cursive' }}>{applyEndTime}</Moment>
        &nbsp;
        {DEAD_LINE}
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

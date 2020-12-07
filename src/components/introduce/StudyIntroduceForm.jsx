import React from 'react';

import styled from '@emotion/styled';

import Moment from 'react-moment';

import { changeDateToTime } from '../../util/utils';

import Tags from '../common/Tags';
import palette from '../../styles/palette';
import DateTimeChange from '../common/DateTimeChange';

const IntroduceReferenceWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: ${palette.gray[1]};
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  label {
    line-height: 3rem;
    font-weight: bold;
    margin-right: .7rem;
  }
`;

const ModeratorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${palette.gray[6]};
  span {
    margin-right: 1rem;
  }
  time {
    font-size: 1rem;
    font-weight: normal;
    color: ${palette.gray[6]};
  }
`;

const IntroduceReference = styled.div`
  padding-right: 50px;
  border-right: 0.1rem solid ${palette.gray[3]};
`;

const IntroduceContentTitle = styled.div`
  padding: 7px 2rem 7px 2rem;
  width: 17%;
  text-align: center;
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 1rem;
  border-bottom: 2px solid ${palette.violet[3]};
  font-size: 1.4rem;
`;

const IntroduceContent = styled.div`
  position: relative;
  margin-top: 2rem;
  border: 0.0625rem solid ${palette.gray[3]};
  border-radius: 0.75rem;
  padding: 1.5rem;
`;

const StudyIntroduceForm = ({
  group, realTime,
}) => {
  const {
    contents, tags, moderatorId, personnel, participants, applyEndDate, createDate,
  } = group;

  const applyEndTime = changeDateToTime(applyEndDate);

  return (
    <>
      <ModeratorWrapper>
        <span>
          {`🙋‍♂️ ${moderatorId}`}
        </span>
        <Moment interval={0} format="YYYY년 MM월 DD일">{changeDateToTime(createDate)}</Moment>
      </ModeratorWrapper>
      <IntroduceReferenceWrapper>
        <IntroduceReference>
          <label htmlFor="application-status">신청 현황 :</label>
          <span id="application-status">
            {`${participants.length} / ${personnel}`}
          </span>
        </IntroduceReference>
        <IntroduceReference>
          <label htmlFor="apply-end">모집 마감 일자 :</label>
          <Moment interval={0} format="YYYY년 MM월 DD일 HH:mm">{applyEndTime}</Moment>
        </IntroduceReference>
        <DateTimeChange
          group={group}
          time={realTime}
          page="introduce"
        />
      </IntroduceReferenceWrapper>
      <IntroduceContentTitle>
        소개
      </IntroduceContentTitle>
      <IntroduceContent dangerouslySetInnerHTML={{ __html: contents }} />
      <Tags tags={tags} />
    </>
  );
};

export default React.memo(StudyIntroduceForm);

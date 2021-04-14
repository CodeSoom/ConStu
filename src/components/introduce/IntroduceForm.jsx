import React from 'react';

import Moment from 'react-moment';

import facepaint from 'facepaint';
import styled from '@emotion/styled';

import { authorizedUsersNumber, changeDateToTime } from '../../util/utils';

import palette from '../../styles/palette';
import SubTitle from '../../styles/SubTitle';

import WriteSvg from '../../assets/icons/writing.svg';
import Tags from '../common/Tags';
import DateTimeChange from '../common/DateTimeChange';
import IntroduceActionButtons from './IntroduceActionButtons';

const mq = facepaint([
  '@media(min-width: 1024px)',
  '@media(min-width: 1150px)',
]);

const IntroduceFormWrapper = styled.div`
  margin-bottom: 3rem;
`;

const IntroduceReferenceWrapper = styled.div`

  ${mq({
    fontSize: ['2vw', '0.9rem', '1.1rem'],
  })};

  font-weight: lighter;
  color: ${palette.gray[7]};
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: ${palette.gray[1]};
  align-items: center;
  
  label {
    line-height: 3rem;
    margin-right: .7rem;
  }
`;

const ModeratorWrapper = styled.div`
  ${mq({
    fontSize: ['2vw', '1rem', '1.2rem'],
  })};
  
  font-weight: lighter;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  color: ${palette.gray[6]};

  time {
  ${mq({
    fontSize: ['2vw', '1rem'],
  })};
    font-weight: normal;
    color: ${palette.gray[6]};
  }

  .writer-info {
    display: flex;
    flex-direction: row;
    align-content: center;

    em {
      padding-top: .2rem;
      padding-left: .3rem;
    }
  }
`;

const IntroduceReference = styled.div`
${mq({
    paddingRight: ['4vw', '30px', '50px'],
  })};

  border-right: 0.1rem solid ${palette.gray[3]};
`;

const IntroduceContent = styled.div`
  
  font-family: 'Nanum Godic', sans-serif;
  position: relative;
  margin-top: 2rem;
  border: 0.0625rem solid ${palette.gray[3]};
  border-radius: 0.75rem;
  padding: 1.5rem;

  p {
    word-break: keep-all;
    overflow-wrap: break-word;
    line-height: 1.5;
    letter-spacing: -0.004em;
  }
`;

const IntroduceFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WriteIcon = styled(WriteSvg)`
  width: 24px;
  height: 24px;
`;

const IntroduceForm = ({
  user, group, realTime, onRemove, onEdit,
}) => {
  const {
    contents, tags, moderatorId, personnel, participants, applyEndDate, createDate, id,
  } = group;

  const applyEndTime = changeDateToTime(applyEndDate);
  const isCheckOwnGroupPost = user && (user === moderatorId);

  return (
    <IntroduceFormWrapper>
      <ModeratorWrapper>
        <div className="writer-info">
          <WriteIcon />
          <em>{moderatorId}</em>
        </div>
        <Moment interval={0} format="YYYY년 MM월 DD일">{changeDateToTime(createDate)}</Moment>
      </ModeratorWrapper>
      <IntroduceReferenceWrapper>
        <IntroduceReference>
          <label htmlFor="application-status">신청 현황 :</label>
          <span id="application-status">
            {`${authorizedUsersNumber(participants)} / ${personnel}`}
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
      <SubTitle title="소개" />
      <IntroduceContent dangerouslySetInnerHTML={{ __html: contents }} />
      <IntroduceFooter>
        <Tags tags={tags} />
        {isCheckOwnGroupPost && (
          <IntroduceActionButtons
            onEdit={onEdit}
            onRemove={() => onRemove(id)}
          />
        )}
      </IntroduceFooter>
    </IntroduceFormWrapper>
  );
};

export default React.memo(IntroduceForm);

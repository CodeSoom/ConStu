import React from 'react';

import Moment from 'react-moment';

import styled from '@emotion/styled';

import { useMediaQuery } from 'react-responsive';

import { authorizedUsersNumber, changeDateToTime } from '../../util/utils';

import palette from '../../styles/palette';
import SubTitle from '../../styles/SubTitle';
import mq, { mq3 } from '../../styles/responsive';

import ProfileSvg from '../../assets/icons/profile.svg';
import Tags from '../common/Tags';
import DateTimeChange from '../common/DateTimeChange';
import IntroduceActionButtons from './IntroduceActionButtons';

const introduceLabelMq = mq3({
  lineHeight: ['1.5rem', '2.2rem', '2.5rem', '3rem'],
  marginRight: ['.5rem', '.7rem'],
});

const IntroduceFormWrapper = styled.div`
  ${mq({
    marginBottom: ['2rem', '3rem'],
  })};
`;

const IntroduceReferenceWrapper = styled.div`
  ${mq3({
    fontSize: ['0.8rem', '1rem', '1rem', '1.1rem'],
    padding: ['0.7rem 0.5rem', '0.7rem 1.5rem', '0.7rem 1.5rem', '1rem'],
    justifyContent: ['unset', 'flex-start', 'flex-start', 'space-evenly'],
    flexDirection: ['column', 'column', 'row'],
    alignItems: ['flex-start', 'flex-start', 'center'],
    borderRadius: ['.5rem', '.75rem'],
    marginBottom: ['1rem', '1.5rem'],
  })};

  font-weight: lighter;
  color: ${({ theme }) => theme.fontColor[1]};
  background-color: ${({ theme }) => theme.subBaseTone[0]};
  display: flex;
  
  label {
    ${introduceLabelMq}
  }
`;

const ModeratorWrapper = styled.div`
  ${mq({
    fontSize: ['0.8rem', '1rem', '1rem', '1.1rem'],
  })};
  
  font-weight: lighter;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  color: ${palette.gray[6]};

  time {
    font-weight: normal;
    color: ${palette.gray[6]};
  }

  .writer-info {
    width: 60%;
    display: flex;
    flex-direction: row;
    align-content: center;

    em {
      word-break: break-all;
      overflow-wrap: break-word;
      padding-top: .2rem;
      padding-left: .3rem;
    }
  }
`;

const IntroduceReference = styled.div`
${mq3({
    padding: ['0 10px', '0 10px', '0 30px', '0 40px 0 0', '0 50px 0 0'],
    borderRight: ['unset', 'unset', `0.1rem solid ${palette.gray[3]}`],
  })};
`;

const IntroduceContent = styled.div`
  ${mq({
    fontSize: ['.9rem', '1rem'],
    marginTop: ['1rem', '2rem'],
    borderRadius: ['.5rem', '.75rem'],
    padding: ['1rem', '1.5rem'],
  })};

  font-family: 'Nanum Godic', sans-serif;
  position: relative;
  border: 0.0625rem solid ${({ theme }) => theme.borderTone[3]};

  p {
    word-break: keep-all;
    overflow-wrap: break-word;
    color: ${({ theme }) => theme.fontColor[4]};
    line-height: 1.5;
    letter-spacing: -0.004em;
  }
`;

const TagWrapper = styled.div`
  ${mq({
    width: ['unset', 'unset', '70%'],
  })};
`;

const IntroduceFooter = styled.div`
${mq({
    flexDirection: ['column', 'column', 'unset'],
    justifyContent: ['unset', 'unset', 'space-between'],
  })};

  display: flex;
  width: 100%;
`;

const ProfileIcon = styled(ProfileSvg)`
  ${mq({
    width: ['18px', '24px'],
    height: ['18px', '24px'],
  })};
`;

const IntroduceForm = ({
  user, group, realTime, onRemove, onEdit,
}) => {
  const isLessThan820Screen = useMediaQuery({ query: '(max-width: 820px)' });

  const {
    contents, tags, moderatorId, personnel, participants, applyEndDate, createDate, id,
  } = group;

  const applyEndTime = changeDateToTime(applyEndDate);
  const isCheckOwnGroupPost = user && (user === moderatorId);

  return (
    <IntroduceFormWrapper>
      <ModeratorWrapper>
        <div className="writer-info">
          <ProfileIcon />
          <em>{moderatorId}</em>
        </div>
        <Moment interval={0} format="YYYY년 MM월 DD일">{changeDateToTime(createDate)}</Moment>
      </ModeratorWrapper>
      <IntroduceReferenceWrapper>
        <IntroduceReference>
          <label htmlFor="application-status">신청 현황 :</label>
          <span id="application-status" style={{ fontFamily: '"Nanum Gothic", sans-serif' }}>
            {`${authorizedUsersNumber(participants)} / ${personnel}`}
          </span>
        </IntroduceReference>
        <IntroduceReference>
          <label htmlFor="apply-end">모집 마감 일자 :</label>
          <Moment
            interval={0}
            format="YYYY년 MM월 DD일 HH:mm"
            style={{ fontFamily: '"Nanum Gothic", sans-serif' }}
          >
            {applyEndTime}
          </Moment>
        </IntroduceReference>
        {!isLessThan820Screen && (
          <DateTimeChange
            group={group}
            time={realTime}
            page="introduce"
          />
        )}
      </IntroduceReferenceWrapper>
      <SubTitle title="소개" />
      <IntroduceContent dangerouslySetInnerHTML={{ __html: contents }} />
      <IntroduceFooter>
        <TagWrapper>
          <Tags tags={tags} />
        </TagWrapper>
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

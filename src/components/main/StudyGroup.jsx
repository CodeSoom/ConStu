import React from 'react';

import { Link } from 'react-router-dom';

import sanitize from 'sanitize-html';

import Moment from 'react-moment';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';

import Tags from '../common/Tags';
import UserSvg from '../../assets/icons/profile.svg';
import DateTimeChange from '../common/DateTimeChange';

const StudyGroupWrapper = styled.div`
  ${mq({
    margin: ['1rem 0px 1rem 0px', '1rem 0px 1rem 0px', '0.5rem', '1rem'],
    width: ['100%', '100%', 'calc(50% - 1.5rem)', '19rem'],
  })};

  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.borderTone[0]};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;
  background: ${({ theme }) => theme.subBaseTone[2]};
  transition-duration: 0.25s, 0.25s;
  transition-timing-function: ease-in, ease-in;
  transition-delay: initial, initial;
  transition-property: box-shadow, transform;

  &:hover {
    transform: translateY(-8px);
    box-shadow: rgba(0, 0, 0, 0.12) 0px 12px 20px 0px;
  }
`;

const HeaderLink = styled(Link)`
  display: block;
  padding: 1.5rem 1rem 0 1rem;

  h4 {
    font-size: 1.7rem;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0px 0px 0.25rem;
    line-height: 1.5;
    overflow: hidden;
    transition: color .25s;
    color: ${({ theme }) => theme.fontColor[0]};

    &:hover {
      color: ${({ theme }) => theme.hoverFontColor[0]};
    }
  }
`;

const StudyInfoWrapper = styled.div`
  padding: 0 1rem .5rem 1rem;
  display: flex;
  flex-direction: column;

  .moderator {
    color: ${({ theme }) => theme.fontColor[2]};
    margin: 1rem 0;
    display: flex;
    flex-direction: row;
    align-content: center;

    em {
      padding-top: .15rem;
      padding-left: .3rem;
    }
  }

  .apply-status {
    color: ${({ theme }) => theme.fontColor[3]};
  }

  .date-time-change {
    display: flex;
    align-items: center;
  }
`;

const StudyContentWrapper = styled.div`
  padding: 1rem;
  display: block;

  p {
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 1.1rem;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    overflow-wrap: break-word;
    line-height: 1.5;
    height: 3.3rem;
    overflow: hidden;
    transition: color .3s;
    color: ${({ theme }) => theme.fontColor[1]};

    &:hover {
      color: ${({ theme }) => theme.hoverFontColor[1]};
    }
  }
`;

const ApplyEndDateWrapper = styled.div`
  color: ${({ theme }) => theme.fontColor[3]};
  padding-bottom: 1rem;
  border-bottom: 1px solid ${palette.gray[4]};
`;

const UserIcon = styled(UserSvg)`
  width: 20px;
  height: 20px;
`;

const removeHtml = (contents) => sanitize(contents, { allowedTags: [] });

const StudyGroup = ({ group, realTime }) => {
  const {
    id, moderatorId, title, applyEndDate, tags, contents,
  } = group;

  const applyEndTime = new Date(applyEndDate);

  return (
    <StudyGroupWrapper>
      <HeaderLink to={`/introduce/${id}`}>
        <h4>
          {title}
        </h4>
      </HeaderLink>
      <StudyContentWrapper>
        <p>
          <Link to={`/introduce/${id}`}>
            {removeHtml(contents)}
          </Link>
        </p>
      </StudyContentWrapper>
      <StudyInfoWrapper>
        <div className="moderator">
          <UserIcon />
          <em>{moderatorId}</em>
        </div>
        <div className="date-time-change">
          <DateTimeChange
            group={group}
            page="main"
            time={realTime}
          />
        </div>
        <ApplyEndDateWrapper>
          {'마감 일자: '}
          <Moment interval={0} format="YYYY년 MM월 DD일">{applyEndTime}</Moment>
        </ApplyEndDateWrapper>
        <Tags
          tags={tags}
          type="main"
        />
      </StudyInfoWrapper>
    </StudyGroupWrapper>
  );
};

export default React.memo(StudyGroup);

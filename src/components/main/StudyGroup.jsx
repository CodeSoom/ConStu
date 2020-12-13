import React from 'react';

import { Link } from 'react-router-dom';

import sanitize from 'sanitize-html';

import Moment from 'react-moment';

import styled from '@emotion/styled';

import Tags from '../common/Tags';
import palette from '../../styles/palette';
import DateTimeChange from '../common/DateTimeChange';

const StudyGroupWrapper = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  width: 19rem;
  margin: 1rem;
  border: 2px solid ${palette.gray[4]};
  border-radius: 4px;
  background: rgb(248, 249, 250);
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
`;

const HeaderLink = styled(Link)`
  display: block;
  padding: 0.8rem 1rem 0.8rem 1rem;
  h4 {
    text-align: center;
    margin: 0px 0px 0.25rem;
    line-height: 1.5;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: ${palette.gray[8]};
    font-size: 2.3rem;
    font-weight: 500;
    font-family: 'Nanum Pen Script', cursive;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
`;

const ContentLink = styled(Link)`
  &:hover {
    color: ${palette.gray[6]};
  }
`;

const StudyInfoWrapper = styled.div`
  padding: 0 1rem 1rem 1rem;
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  .moderator{
    color: ${palette.gray[5]};
    font-weight: bold;
  }
`;

const StudyContentWrapper = styled.div`
  display: block;
  padding: 0 1rem 0 1rem;
  flex: 1 1 0%;
  p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
    overflow-wrap: break-word;
    line-height: 1.5;
    height: 3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${palette.gray[7]};
  }
`;

const ApplyEndDateWrapper = styled.div`
  padding-bottom: 1rem;
  border: 50%;
  border-bottom: 1px solid ${palette.gray[4]}; 
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
          <ContentLink to={`/introduce/${id}`}>
            {removeHtml(contents)}
          </ContentLink>
        </p>
      </StudyContentWrapper>
      <StudyInfoWrapper>
        <div className="moderator">{moderatorId}</div>
        <div>
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
        <Tags tags={tags} />
      </StudyInfoWrapper>
    </StudyGroupWrapper>
  );
};

export default React.memo(StudyGroup);

import React from 'react';

import { Link } from 'react-router-dom';

import sanitize from 'sanitize-html';

import Moment from 'react-moment';

import facepaint from 'facepaint';
import styled from '@emotion/styled';

import Tags from '../common/Tags';
import palette from '../../styles/palette';
import DateTimeChange from '../common/DateTimeChange';

const mq = facepaint([
  '@media(min-width: 650px)',
  '@media(min-width: 1024px)',
]);

const StudyGroupWrapper = styled.div(() => mq({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  margin: ['1rem 0px 1rem 0px', '0.5rem', '1rem'],
  borderRadius: '4px',
  border: `2px solid ${palette.gray[4]}`,
  width: ['100%', 'calc(50% - 1.5rem)', '19rem'],
  boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 16px 0px',
  background: 'rgb(248, 249, 250)',
}));

const HeaderLink = styled(Link)`
  display: block;
  padding: 1.5rem 1.2rem 0.8rem 1rem;

  h4 {
    font-size: 1.7rem;
    font-family: 'Sunflower', sans-serif;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0px 0px 0.25rem;
    line-height: 1.5;
    overflow: hidden;
    color: ${palette.gray[8]};

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
  flex-direction: column;

  .moderator{
    font-weight: bold;
    color: ${palette.gray[5]};
  }
`;

const StudyContentWrapper = styled.div`
  padding: 0 1rem 0 1rem;
  display: block;

  p {
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
    overflow-wrap: break-word;
    line-height: 1.5;
    height: 3rem;
    overflow: hidden;
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

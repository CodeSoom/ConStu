import React from 'react';

import styled from '@emotion/styled';

import Tags from '../common/Tags';
import palette from '../../styles/palette';
import DateTimeChange from '../common/DateTimeChange';

const StudyIntroduceWrapper = styled.div`
  margin-top: 6em;
`;

const IntroduceHeaderWrapper = styled.div`
  border-bottom: 2px solid ${palette.gray[4]};
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 2.3rem;
    line-height: 1.5;
    margin: 0;
  }
  // TODO: 추후 공통 버튼 style component로 변경
  button {
    display: inline-flex;
    align-items: center;
    margin: .5rem 0 .5rem 0;
    padding: 0.25rem 5rem;
    font-size: 1.5em;
    line-height: 0;
    font-family: 'Gamja Flower', cursive;
    border-radius: 0.4rem;
    border: none;
    background: ${palette.teal[5]};
    color: white;
    cursor: pointer;
    &:hover{
      background: ${palette.teal[4]};
    }
  }
`;

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
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${palette.gray[6]};
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

const StudyIntroduceForm = ({ group }) => {
  const {
    title, contents, tags, moderatorId, personnel, participants, applyEndDate,
  } = group;

  return (
    <StudyIntroduceWrapper>
      <IntroduceHeaderWrapper>
        <h1>{title}</h1>
        <button type="button">신청하기</button>
      </IntroduceHeaderWrapper>
      <ModeratorWrapper>
        {`🙋‍♂️ ${moderatorId}`}
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
          <span id="apply-end">{applyEndDate}</span>
        </IntroduceReference>
        <DateTimeChange
          group={group}
          page="introduce"
        />
      </IntroduceReferenceWrapper>
      <IntroduceContentTitle>
        소개
      </IntroduceContentTitle>
      {/* TODO: dangerouslySetInnerHTML으로 변경하기 */}
      <IntroduceContent>
        {contents}
      </IntroduceContent>
      <Tags tags={tags} />
    </StudyIntroduceWrapper>
  );
};

export default StudyIntroduceForm;

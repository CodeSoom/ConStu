import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import StudyIntroduceForm from './StudyIntroduceForm';

import STUDY_GROUP from '../../../fixtures/study-group';

describe('StudyIntroduceForm', () => {
  const renderStudyIntroduceForm = ({ group, time, user = 'user' }) => render((
    <MemoryRouter>
      <StudyIntroduceForm
        user={user}
        group={group}
        realTime={time}
      />
    </MemoryRouter>
  ));

  it('renders createDate text', () => {
    const { container } = renderStudyIntroduceForm({ group: STUDY_GROUP });

    expect(container).toHaveTextContent('2020년 12월 06일');
  });

  it('renders study group title and contents', () => {
    const { container } = renderStudyIntroduceForm({ group: STUDY_GROUP });

    expect(container).toHaveTextContent('스터디를 소개합니다.2');
  });

  it('renders links of tags', () => {
    const { container } = renderStudyIntroduceForm({ group: STUDY_GROUP });

    expect(container.innerHTML).toContain('<a ');
  });

  context('When the author and the logged-in user have the same ID', () => {
    it("doesn't renders apply button", () => {
      const { container } = renderStudyIntroduceForm({ group: STUDY_GROUP, user: 'user2' });

      expect(container).not.toHaveTextContent('신청하기');
    });
  });

  context('When the study recruitment is closed', () => {
    const time = Date.now();

    describe('current time is after the recruitment deadline', () => {
      const nowDate = new Date();
      const yesterday = nowDate.setDate(nowDate.getDate() - 1);

      const group = {
        ...STUDY_GROUP,
        applyEndDate: yesterday,
        participants: [
          'user2',
        ],
        personnel: 2,
      };

      it('renders recruitment closed text', () => {
        const { container } = renderStudyIntroduceForm({ group, time });

        expect(container).toHaveTextContent('모집마감');
        expect(container).not.toHaveTextContent('신청하기');
      });
    });

    describe('When the number of study group participants equals the maximum number of participants', () => {
      const nowDate = new Date();
      const tomorrow = nowDate.setDate(nowDate.getDate() + 1);

      const group = {
        ...STUDY_GROUP,
        applyEndDate: tomorrow,
        participants: [
          'user2',
          'user3',
        ],
        personnel: 2,
      };

      it('renders recruitment closed text', () => {
        const { container } = renderStudyIntroduceForm({ group, time });

        expect(container).toHaveTextContent('모집마감');
        expect(container).not.toHaveTextContent('신청하기');
      });
    });
  });

  context('When the study recruitment is opened', () => {
    const time = Date.now();

    describe(`current time is before the recruitment deadline and 
      when the number of study group participants is less than the maximum number of participants`, () => {
      const nowDate = new Date();
      const tomorrow = nowDate.setDate(nowDate.getDate() + 1);

      const group = {
        ...STUDY_GROUP,
        applyEndDate: tomorrow,
        participants: [
          'user2',
        ],
        personnel: 2,
      };

      it('renders recruitment apply text', () => {
        const { container } = renderStudyIntroduceForm({ group, time });

        expect(container).toHaveTextContent('신청하기');
        expect(container).not.toHaveTextContent('모집마감');
      });
    });
  });
});

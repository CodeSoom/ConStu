import React from 'react';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import StudyGroup from './StudyGroup';

describe('StudyGroup', () => {
  const renderStudyGroup = ({ group }) => render((
    <MemoryRouter>
      <StudyGroup
        group={group}
      />
    </MemoryRouter>
  ));

  describe('renders study group text contents', () => {
    const group = {
      id: 1,
      title: '스터디를 소개합니다.2',
      moderatorId: 'user2',
      applyEndDate: '2020-12-23',
      participants: [
        'user2',
      ],
      personnel: 2,
      tags: [
        'JavaScript',
        'React',
        'Algorithm',
      ],
    };
    it('renders title, moderatorId, tags', () => {
      const { container } = renderStudyGroup({ group });

      expect(container).toHaveTextContent('스터디를 소개합니다.2');
      expect(container).toHaveTextContent('user2');
      group.tags.forEach((tag) => {
        expect(container).toHaveTextContent(`#${tag}`);
      });
      expect(container).toHaveTextContent('2020년 12월 23일');
    });

    it('renders changed applyEndDate format', () => {
      const { container } = renderStudyGroup({ group });

      expect(container).toHaveTextContent('2020년 12월 23일');
    });

    it('renders study status is Recruiting', () => {
      const { container } = renderStudyGroup({ group });

      expect(container).toHaveTextContent('모집중');
    });
  });
});

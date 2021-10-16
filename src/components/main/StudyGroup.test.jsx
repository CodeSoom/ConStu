import React from 'react';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { tomorrow } from '../../util/utils';

import StudyGroup from './StudyGroup';
import MockTheme from '../common/test/MockTheme';

const isCheckOverTen = (calendar) => (calendar < 9 ? '0' : '');

describe('StudyGroup', () => {
  const renderStudyGroup = ({ group }) => render((
    <MockTheme>
      <MemoryRouter>
        <StudyGroup
          group={group}
        />
      </MemoryRouter>
    </MockTheme>
  ));

  describe('renders study group text contents', () => {
    const tomorrowDate = new Date(tomorrow);
    const month = tomorrowDate.getMonth();
    const date = tomorrowDate.getDate();

    const dateFormat = `${tomorrowDate.getFullYear()}년 ${isCheckOverTen(month)}${month + 1}월 ${isCheckOverTen(date)}${date}일`;

    const group = {
      id: 1,
      title: '스터디를 소개합니다.2',
      moderatorId: 'user2',
      applyEndDate: tomorrowDate,
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
      expect(container).toHaveTextContent(dateFormat);
    });

    it('renders changed applyEndDate format', () => {
      const { container } = renderStudyGroup({ group });

      expect(container).toHaveTextContent(dateFormat);
    });

    it('renders study status is Recruiting', () => {
      const { container } = renderStudyGroup({ group });

      expect(container).toHaveTextContent('하루 후 모집 마감');
    });
  });
});

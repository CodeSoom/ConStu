import React from 'react';

import { render } from '@testing-library/react';

import DateTimeChange from './DateTimeChange';

describe('DateTimeChange', () => {
  const renderDateTimeChange = ({ group }) => render((
    <DateTimeChange
      group={group}
    />
  ));

  describe('current time is before the application deadline', () => {
    it('renders Recruiting text', () => {
      const nowDate = new Date();
      const tomorrow = nowDate.setDate(nowDate.getDate() + 1);

      const group = {
        applyEndDate: tomorrow,
        participants: [
          'user2',
        ],
        personnel: 2,
      };

      const { container } = renderDateTimeChange({ group });

      expect(container).toHaveTextContent('모집중');
    });
  });

  describe('current time is after the application deadline', () => {
    it('renders Application deadline text', () => {
      const nowDate = new Date();
      const yesterday = nowDate.setDate(nowDate.getDate() - 1);

      const group = {
        applyEndDate: yesterday,
        participants: [
          'user2',
        ],
        personnel: 2,
      };

      const { container } = renderDateTimeChange({ group });

      expect(container).toHaveTextContent('모집마감');
    });
  });

  describe('When the number of study group participants equals the maximum number of participants', () => {
    it('renders Application deadline text', () => {
      const nowDate = new Date();
      const tomorrow = nowDate.setDate(nowDate.getDate() - 1);

      const group = {
        applyEndDate: tomorrow,
        participants: [
          'user2',
          'user3',
        ],
        personnel: 2,
      };

      const { container } = renderDateTimeChange({ group });

      expect(container).toHaveTextContent('모집마감');
    });
  });
});

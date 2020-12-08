import React from 'react';

import { render } from '@testing-library/react';

import DateTimeChange from './DateTimeChange';

describe('DateTimeChange', () => {
  const renderDateTimeChange = ({ group, page, time }) => render((
    <DateTimeChange
      group={group}
      page={page}
      time={time}
    />
  ));

  context('When on the main page', () => {
    const page = 'main';
    const time = Date.now();

    it('renders Recruitment number text', () => {
      const group = {
        applyEndDate: null,
        participants: [
          'user2',
        ],
        personnel: 2,
      };

      const { participants, personnel } = group;

      const { container } = renderDateTimeChange({ group, page, time });

      expect(container).toHaveTextContent(`모집 인원: ${participants.length} / ${personnel}`);
    });

    describe(`current time is before the recruitment deadline
      when the number of study group participants is less than the maximum number of participants`, () => {
      it('renders Recruiting text', () => {
        const nowDate = new Date();
        const tomorrow = nowDate.setDate(nowDate.getDate() + 1);
        const tomorrowDate = new Date(tomorrow);

        const group = {
          applyEndDate: tomorrowDate,
          participants: [
            'user2',
          ],
          personnel: 2,
        };

        const { container } = renderDateTimeChange({ group, page, time });

        expect(container).toHaveTextContent('하루 후 모집 마감');
      });
    });

    describe('current time is after the recruitment deadline', () => {
      it('renders recruitment deadline text', () => {
        const nowDate = new Date();
        const yesterday = nowDate.setDate(nowDate.getDate() - 1);

        const group = {
          applyEndDate: yesterday,
          participants: [
            'user2',
          ],
          personnel: 2,
        };

        const { container } = renderDateTimeChange({ group, page, time });

        expect(container).toHaveTextContent('모집마감');
      });
    });

    describe('When the number of study group participants equals the maximum number of participants', () => {
      it('renders recruitment deadline text', () => {
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

        const { container } = renderDateTimeChange({ group, page, time });

        expect(container).toHaveTextContent('모집마감');
      });
    });
  });

  context('When on the introduce page', () => {
    const page = 'introduce';
    const time = Date.now();

    describe(`current time is before the recruitment deadline
      when the number of study group participants is less than the maximum number of participants`, () => {
      it('renders recruitment deadline one day later text', () => {
        const nowDate = new Date();
        const tomorrow = nowDate.setDate(nowDate.getDate() + 1);

        const group = {
          applyEndDate: tomorrow,
          participants: [
            'user2',
          ],
          personnel: 2,
        };

        const { container } = renderDateTimeChange({ group, page, time });

        expect(container).toHaveTextContent('하루 후 모집 마감');
      });
    });

    describe('current time is after the recruitment deadline', () => {
      it('renders recruitment deadline text', () => {
        const nowDate = new Date();
        const yesterday = nowDate.setDate(nowDate.getDate() - 1);

        const group = {
          applyEndDate: yesterday,
          participants: [
            'user2',
          ],
          personnel: 2,
        };

        const { container } = renderDateTimeChange({ group, page, time });

        expect(container).toHaveTextContent('모집 마감');
      });
    });

    describe('When the number of study group participants equals the maximum number of participants', () => {
      it('renders recruitment deadline text', () => {
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

        const { container } = renderDateTimeChange({ group, page, time });

        expect(container).toHaveTextContent('모집 마감');
      });
    });
  });
});

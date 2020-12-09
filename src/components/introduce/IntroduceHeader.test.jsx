import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import IntroduceHeader from './IntroduceHeader';

import STUDY_GROUP from '../../../fixtures/study-group';

describe('IntroduceHeader', () => {
  const handleApply = jest.fn();
  const handleApplyCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderIntroduceHeader = ({ group, time, user }) => render((
    <IntroduceHeader
      user={user}
      group={group}
      applyFields={{ reason: '', wantToGet: '' }}
      realTime={time}
      onApply={handleApply}
      onApplyCancel={handleApplyCancel}
    />
  ));

  it('renders study group title and contents', () => {
    const { container } = renderIntroduceHeader({ group: STUDY_GROUP });

    expect(container).toHaveTextContent('스터디를 소개합니다.2');
  });

  context(`When the application date is earlier than the 
    deadline date and the application deadline is not reached`, () => {
    const time = Date.now();

    const nowDate = new Date();
    const tomorrow = nowDate.setDate(nowDate.getDate() + 1);

    const group = {
      ...STUDY_GROUP,
      applyEndDate: tomorrow,
      participants: [
        'user2',
        'user',
      ],
      personnel: 3,
    };

    context('click confirm', () => {
      it('Call the cancel application button.', () => {
        const { getByText } = renderIntroduceHeader({ group, user: 'user', time });

        const button = getByText('신청 취소');

        expect(button).not.toBeNull();

        fireEvent.click(button);

        fireEvent.click(getByText('확인'));

        expect(handleApplyCancel).toBeCalled();
      });
    });

    context('click cancel', () => {
      it("doesn't call the cancel application button.", () => {
        const { getByText } = renderIntroduceHeader({ group, user: 'user', time });

        const button = getByText('신청 취소');

        expect(button).not.toBeNull();

        fireEvent.click(button);

        fireEvent.click(getByText('취소'));

        expect(handleApplyCancel).not.toBeCalled();
      });
    });
  });

  context('When the author and the logged-in user have the same ID', () => {
    it("doesn't renders apply button", () => {
      const { container } = renderIntroduceHeader({ group: STUDY_GROUP, user: 'user2' });

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
        const { container } = renderIntroduceHeader({ group, time });

        expect(container).toHaveTextContent('모집 마감');
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
        const { container } = renderIntroduceHeader({ group, time });

        expect(container).toHaveTextContent('모집 마감');
      });
    });

    describe('When the user clicks the Apply button without logging in', () => {
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

      it('renders modal window appears and application failure message', () => {
        const { container, getByText } = renderIntroduceHeader({ group, time });

        const button = getByText('신청하기');

        expect(button).not.toBeNull();

        fireEvent.click(button);

        expect(handleApply).not.toBeCalled();

        expect(container).toHaveTextContent('로그인 후 신청 가능합니다.');

        fireEvent.click(getByText('확인'));

        expect(container).not.toHaveTextContent('로그인 후 신청 가능합니다.');
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
        const { container } = renderIntroduceHeader({ group, time });

        expect(container).toHaveTextContent('신청하기');
        expect(container).not.toHaveTextContent('모집마감');
      });
    });

    describe('When the user clicks the Apply button after logging in', () => {
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

      context('Click confirm Study participation application', () => {
        it('renders modal window appears and application failure message', () => {
          const { container, getByText } = renderIntroduceHeader({ group, time, user: 'user' });

          const button = getByText('신청하기');

          expect(button).not.toBeNull();

          fireEvent.click(button);

          // TODO: 이 부분은 추후 변경해야된다 현재 스터디 참여 신청서 모달창이 나타남.
          fireEvent.click(getByText('확인'));

          expect(handleApply).toBeCalled();

          expect(container).not.toHaveTextContent('로그인 후 신청 가능합니다.');
        });
      });

      context('Click cancel Study participation application', () => {
        it('renders modal window appears and application failure message', () => {
          const { getByText } = renderIntroduceHeader({ group, time, user: 'user' });

          const button = getByText('신청하기');

          expect(button).not.toBeNull();

          fireEvent.click(button);

          fireEvent.click(getByText('취소'));

          expect(handleApply).not.toBeCalled();
        });
      });
    });
  });
});

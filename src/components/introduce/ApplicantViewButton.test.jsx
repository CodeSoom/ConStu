import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import ApplicantViewButton from './ApplicantViewButton';

import STUDY_GROUP from '../../../fixtures/study-group';

describe('ApplicantViewButton', () => {
  const handleApply = jest.fn();
  const handleApplyCancel = jest.fn();
  const handleClearForm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderApplicantViewButton = ({ group, time, user }) => render((
    <ApplicantViewButton
      user={user}
      group={group}
      applyFields={{ reason: 'reason', wantToGet: 'reason' }}
      realTime={time}
      onApply={handleApply}
      onApplyCancel={handleApplyCancel}
      clearForm={handleClearForm}
    />
  ));

  context('When the host and logged in user are the same', () => {
    const group = {
      ...STUDY_GROUP,
      moderatorId: 'user',
    };

    it('nothing renders', () => {
      const { container } = renderApplicantViewButton({ group, user: 'user' });

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('When the organizer and the logged-in user are different', () => {
    context(`When the application date is earlier than the 
      deadline date and the application deadline is not reached`, () => {
      const time = Date.now();

      const nowDate = new Date();
      const tomorrow = nowDate.setDate(nowDate.getDate() + 1);

      const group = {
        ...STUDY_GROUP,
        applyEndDate: tomorrow,
        participants: [
          { id: 'user2' },
          { id: 'user', confirm: false },
        ],
        personnel: 3,
      };

      context('click confirm', () => {
        it('Call the cancel application button.', () => {
          const { getByText } = renderApplicantViewButton({ group, user: 'user', time });

          const button = getByText('신청 취소');

          expect(button).not.toBeNull();

          fireEvent.click(button);

          fireEvent.click(getByText('확인'));

          expect(handleApplyCancel).toBeCalled();
        });
      });

      context('click cancel', () => {
        it("doesn't call the cancel application button.", () => {
          const { getByText } = renderApplicantViewButton({ group, user: 'user', time });

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
        const { container } = renderApplicantViewButton({ group: STUDY_GROUP, user: 'user2' });

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
            { id: 'user1', confirm: false },
          ],
          personnel: 2,
        };

        it('renders recruitment closed text', () => {
          const { container } = renderApplicantViewButton({ group, time, user: 'user1' });

          expect(container).toHaveTextContent('승인 거절');
        });
      });

      describe('When the number of study group participants equals the maximum number of participants', () => {
        const nowDate = new Date();
        const tomorrow = nowDate.setDate(nowDate.getDate() + 1);

        const group = {
          ...STUDY_GROUP,
          applyEndDate: tomorrow,
          participants: [
            { id: 'user2' },
            { id: 'user3', confirm: false },
          ],
          personnel: 1,
        };

        it('renders recruitment closed text', () => {
          const { container } = renderApplicantViewButton({ group, time, user: 'user4' });

          expect(container).toHaveTextContent('모집 마감');
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
            { id: 'user2' },
          ],
          personnel: 2,
        };

        it('renders recruitment apply text', () => {
          const { container } = renderApplicantViewButton({ group, time });

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
            { id: 'user2' },
          ],
          personnel: 2,
        };

        context('Click confirm Study participation application', () => {
          it('renders modal window appears and application failure message', () => {
            const { container, getByText } = renderApplicantViewButton({ group, time, user: 'user' });

            const button = getByText('신청하기');

            expect(button).not.toBeNull();

            fireEvent.click(button);

            fireEvent.click(getByText('확인'));

            expect(handleApply).toBeCalled();

            expect(container).not.toHaveTextContent('로그인 후 신청 가능합니다.');
          });
        });

        context('Click cancel Study participation application', () => {
          it('renders modal window appears and application failure message', () => {
            const { getByText } = renderApplicantViewButton({ group, time, user: 'user' });

            const button = getByText('신청하기');

            expect(button).not.toBeNull();

            fireEvent.click(button);

            fireEvent.click(getByText('취소'));

            expect(handleApply).not.toBeCalled();
          });
        });
      });

      describe('When the user clicks the Apply button without logging in', () => {
        const nowDate = new Date();
        const tomorrow = nowDate.setDate(nowDate.getDate() + 1);

        const group = {
          ...STUDY_GROUP,
          applyEndDate: tomorrow,
          participants: [
            { id: 'user2' },
          ],
          personnel: 2,
        };

        it('renders modal window appears and application failure message', () => {
          const { container, getByText } = renderApplicantViewButton({ group, time });

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
  });
});

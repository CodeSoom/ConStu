import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { Context as ResponsiveContext } from 'react-responsive';

import STUDY_GROUP from '../../../fixtures/study-group';

import MockTheme from '../common/test/MockTheme';
import ModeratorViewButton from './ModeratorViewButton';

describe('ModeratorViewButton', () => {
  const renderModeratorViewButton = ({
    group, user, realTime, width = 700,
  }) => render((
    <MockTheme>
      <ResponsiveContext.Provider value={{ width }}>
        <ModeratorViewButton
          user={user}
          group={group}
          realTime={realTime}
        />
      </ResponsiveContext.Provider>
    </MockTheme>
  ));

  context('When the organizer and the logged-in user are different', () => {
    const realTime = Date.now();

    const nowDate = new Date();
    const tomorrow = nowDate.setDate(nowDate.getDate() + 1);

    const user = 'user';

    const group = {
      ...STUDY_GROUP,
      moderatorId: 'user2',
      applyEndDate: tomorrow,
    };

    it('nothing renders', () => {
      const { container } = renderModeratorViewButton({
        group,
        user,
        realTime,
      });

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('When the host and logged in user are the same', () => {
    const user = 'user';
    const realTime = Date.now();

    const applyEndDateSettings = (applyEndDate) => ({
      ...STUDY_GROUP,
      applyEndDate,
      moderatorId: 'user',
      participants: [
        {
          confirm: true,
          id: 'test1',
        },
        {
          confirm: false,
          id: 'test2',
        },
      ],
    });

    context('When the current date is before the deadline', () => {
      const nowDate = new Date();
      const tomorrow = nowDate.setDate(nowDate.getDate() + 1);

      const group = applyEndDateSettings(tomorrow);

      it('renders button', () => {
        const { container } = renderModeratorViewButton({ group, user, realTime });

        expect(container).toHaveTextContent('스터디 참여 승인하기');
      });

      it('click button and renders List of study applicants', () => {
        const { getByText, container } = renderModeratorViewButton({ group, user, realTime });
        const button = getByText('스터디 참여 승인하기');

        fireEvent.click(button);

        expect(container).toHaveTextContent('스터디 신청자 목록');
      });

      it('Clicking the close button closes the modal window.', () => {
        const { getByText, container } = renderModeratorViewButton({ group, user, realTime });
        const button = getByText('스터디 참여 승인하기');

        fireEvent.click(button);

        fireEvent.click(getByText('닫기'));

        expect(container).not.toHaveTextContent('스터디 신청자 목록');
      });

      context('When Mobile screen', () => {
        describe('When there is an applicant pending approval', () => {
          it('renders "Waiting for approval!" text', () => {
            const { container } = renderModeratorViewButton({
              group, user, realTime, width: 400,
            });

            expect(container).toHaveTextContent('1명이 승인을 대기 중..');
          });
        });
      });

      context('When desktop screen', () => {
        describe('When there is an applicant pending approval', () => {
          it('renders "Waiting for approval!" text', () => {
            const { container } = renderModeratorViewButton({ group, user, realTime });

            expect(container).toHaveTextContent('1명이 승인을 기다리고 있습니다!');
          });
        });

        context('When there are no applicants waiting for approval', () => {
          const changeGroup = {
            ...STUDY_GROUP,
            moderatorId: 'user',
            participants: [
              {
                confirm: true,
                id: 'test1',
              },
            ],
          };

          it("doesn't renders 'Waiting for approval!' text", () => {
            const { container } = renderModeratorViewButton({ group: changeGroup, user, realTime });

            expect(container).not.toHaveTextContent('1명이 승인을 기달리고 있습니다!');
          });
        });
      });
    });

    context('When the current date is after the deadline', () => {
      const nowDate = new Date();
      const yesterday = nowDate.setDate(nowDate.getDate() - 1);

      const group = applyEndDateSettings(yesterday);

      it('renders "Please proceed with the study!" status message', () => {
        const { container } = renderModeratorViewButton({ group, user, realTime });

        expect(container).toHaveTextContent('스터디를 진행해주세요!');
      });
    });
  });
});

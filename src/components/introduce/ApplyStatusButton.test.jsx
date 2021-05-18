import React from 'react';

import { render } from '@testing-library/react';

import MockTheme from '../common/test/MockTheme';
import ApplyStatusButton from './ApplyStatusButton';

describe('ApplyStatusButton', () => {
  const handleApply = jest.fn();

  const renderApplyStatusButton = ({
    userStatus,
    timeStatus = false,
  }) => render((
    <MockTheme>
      <ApplyStatusButton
        userStatus={userStatus}
        onApply={handleApply}
        timeStatus={timeStatus}
      />
    </MockTheme>
  ));

  context('When the applicant applies before the application deadline', () => {
    context('Before approval', () => {
      it('renders cancel application and Pending approval', () => {
        const { container } = renderApplyStatusButton({
          userStatus: { confirm: false },
        });

        expect(container).toHaveTextContent('신청 취소');
        expect(container).toHaveTextContent('승인 대기 중..');
      });
    });

    context('After approval', () => {
      it('renders Cancel application and Approved', () => {
        const { container } = renderApplyStatusButton({
          userStatus: { confirm: true },
        });

        expect(container).toHaveTextContent('신청 취소');
        expect(container).toHaveTextContent('승인 완료!');
      });
    });
  });

  context('When the study application is completed', () => {
    it('renders "application completed"', () => {
      const { container } = renderApplyStatusButton({
        userStatus: { confirm: true },
        timeStatus: true,
      });

      expect(container).toHaveTextContent('신청 완료');
    });
  });

  context('When the study application deadline', () => {
    it('renders "Rejection of approval"', () => {
      const { container } = renderApplyStatusButton({
        userStatus: { confirm: false },
        timeStatus: true,
      });

      expect(container).toHaveTextContent('승인 거절');
    });

    it('renders "Application deadline"', () => {
      const { container } = renderApplyStatusButton({
        timeStatus: true,
      });

      expect(container).toHaveTextContent('모집 마감');
    });
  });

  context('When it is possible to apply', () => {
    it('renders "apply" text', () => {
      const { container } = renderApplyStatusButton({});

      expect(container).toHaveTextContent('신청하기');
    });
  });
});

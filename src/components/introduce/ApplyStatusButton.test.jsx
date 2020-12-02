import React from 'react';

import { render } from '@testing-library/react';

import ApplyStatusButton from './ApplyStatusButton';

describe('ApplyStatusButton', () => {
  const handleApply = jest.fn();

  const renderApplyStatusButton = ({
    applyStatus = false,
    timeStatus = false,
    user = true,
  }) => render((
    <ApplyStatusButton
      applyStatus={applyStatus}
      onApply={handleApply}
      timeStatus={timeStatus}
      user={user}
    />
  ));

  context('When the study application is completed', () => {
    it('renders application completed', () => {
      const { container } = renderApplyStatusButton({ applyStatus: true });

      expect(container).toHaveTextContent('신청 완료');
    });
  });

  context('When the study application deadline', () => {
    it('renders application deadline', () => {
      const { container } = renderApplyStatusButton({ timeStatus: true });

      expect(container).toHaveTextContent('모집 마감');
    });
  });

  context('When not log in', () => {
    it('renders "You can apply after logging in." text', () => {
      const { container } = renderApplyStatusButton({ user: false });

      expect(container).toHaveTextContent('로그인 후 신청 가능합니다.');
    });
  });

  context('When it is possible to apply', () => {
    it('renders "apply" text', () => {
      const { container } = renderApplyStatusButton({});

      expect(container).toHaveTextContent('신청하기');
    });
  });
});

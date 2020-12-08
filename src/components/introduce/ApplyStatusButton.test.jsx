import React from 'react';

import { render } from '@testing-library/react';

import ApplyStatusButton from './ApplyStatusButton';

describe('ApplyStatusButton', () => {
  const handleApply = jest.fn();

  const renderApplyStatusButton = ({
    applyStatus = false,
    timeStatus = false,
  }) => render((
    <ApplyStatusButton
      applyStatus={applyStatus}
      onApply={handleApply}
      timeStatus={timeStatus}
    />
  ));

  context('When the applicant applies before the application deadline', () => {
    it('renders Cancel application', () => {
      const { container } = renderApplyStatusButton({ applyStatus: true });

      expect(container).toHaveTextContent('신청 취소');
    });
  });

  context('When the study application is completed', () => {
    it('renders application completed', () => {
      const { container } = renderApplyStatusButton({ applyStatus: true, timeStatus: true });

      expect(container).toHaveTextContent('신청 완료');
    });
  });

  context('When the study application deadline', () => {
    it('renders application deadline', () => {
      const { container } = renderApplyStatusButton({ timeStatus: true });

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

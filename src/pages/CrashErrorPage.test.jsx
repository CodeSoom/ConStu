import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import CrashErrorPage from './CrashErrorPage';
import InjectMockProviders from '../components/common/test/InjectMockProviders';

describe('CrashErrorPage', () => {
  const handleResolve = jest.fn();

  beforeEach(() => {
    handleResolve.mockClear();
  });

  const renderCrashErrorPage = () => render((
    <InjectMockProviders>
      <CrashErrorPage
        onResolve={handleResolve}
      />
    </InjectMockProviders>
  ));

  describe('Renders CrashError Contents', () => {
    it('should be renders Message Text and "홈으로" Button', () => {
      const { container } = renderCrashErrorPage();

      expect(container).toHaveTextContent('이런.. 오류가 발생했어요!');
      expect(container).toHaveTextContent('홈으로');
    });

    it('Click "홈으로" button calls resolve event', () => {
      const { getByText } = renderCrashErrorPage();

      fireEvent.click(getByText('홈으로'));

      expect(handleResolve).toBeCalled();
    });
  });
});

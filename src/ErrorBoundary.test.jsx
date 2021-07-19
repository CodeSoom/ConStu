import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { render, fireEvent } from '@testing-library/react';

import ErrorBoundary from './ErrorBoundary';
import InjectMockProviders from './components/common/test/InjectMockProviders';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return {
      push: mockPush,
    };
  },
}));
jest.mock('react-redux');

describe('ErrorBoundary', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      commonReducer: {
        errorType: given.errorType,
      },
    }));
  });

  const renderErrorBoundary = (ui) => render(ui);

  context('Has Crash Error', () => {
    given('errorType', () => null);

    const MockComponent = () => {
      throw new Error('error');
    };

    it('should be renders "이런.. 오류가 발생했어요!" Error Message', () => {
      const { container } = renderErrorBoundary((
        <InjectMockProviders>
          <ErrorBoundary>
            <MockComponent />
          </ErrorBoundary>
        </InjectMockProviders>
      ));

      expect(container).toHaveTextContent('이런.. 오류가 발생했어요!');
    });

    describe('When Crash Error Page, click the "홈으로" button.', () => {
      it('should be call history push: path is "/"', () => {
        const { container, getByText } = renderErrorBoundary((
          <InjectMockProviders>
            <ErrorBoundary>
              <MockComponent />
            </ErrorBoundary>
          </InjectMockProviders>
        ));

        expect(container).toHaveTextContent('이런.. 오류가 발생했어요!');

        fireEvent.click(getByText('홈으로'));

        expect(mockPush).toBeCalledWith('/');
      });
    });
  });

  context("Hasn't Crash Error", () => {
    context('Without Not Found Error Type', () => {
      given('errorType', () => null);
      const MockComponent = () => (
        <h1>정상입니다!</h1>
      );

      it('should be Success render component', () => {
        const { container } = renderErrorBoundary((
          <ErrorBoundary>
            <MockComponent />
          </ErrorBoundary>
        ));

        expect(container).toHaveTextContent('정상입니다!');
      });
    });

    context('With Not Found Error Type', () => {
      given('errorType', () => 'NOT_FOUND');
      const MockComponent = () => (
        <h1>정상입니다!</h1>
      );

      it('should be Success render component', () => {
        const { container } = renderErrorBoundary((
          <InjectMockProviders>
            <ErrorBoundary>
              <MockComponent />
            </ErrorBoundary>
          </InjectMockProviders>
        ));

        expect(container).toHaveTextContent('아무것도 없어요!');
      });
    });
  });
});

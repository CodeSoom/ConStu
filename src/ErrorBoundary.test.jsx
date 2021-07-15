import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { ThemeProvider } from '@emotion/react';

import { render } from '@testing-library/react';

import { lightTheme } from './styles/theme';

import ErrorBoundary from './ErrorBoundary';

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

  context('Has Unknown Error', () => {
    given('errorType', () => null);

    const MockComponent = () => {
      throw new Error('error');
    };

    it('should be renders "앗! 알 수 없는 오류가 발생했어요!" Error Message', () => {
      const { container } = renderErrorBoundary((
        <ErrorBoundary>
          <MockComponent />
        </ErrorBoundary>
      ));

      expect(container).toHaveTextContent('앗! 알 수 없는 오류가 발생했어요!');
    });
  });

  context("Hasn't Unknown Error", () => {
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
          <ErrorBoundary>
            <ThemeProvider theme={lightTheme}>
              <MockComponent />
            </ThemeProvider>
          </ErrorBoundary>
        ));

        expect(container).toHaveTextContent('아무것도 없어요!');
      });
    });
  });
});

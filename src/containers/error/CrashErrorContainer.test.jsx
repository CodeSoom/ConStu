import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import CrashErrorContainer from './CrashErrorContainer';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return {
      push: mockPush,
    };
  },
}));

describe('CrashErrorContainer', () => {
  const handleResolve = jest.fn();

  beforeEach(() => {
    handleResolve.mockClear();
  });

  const renderCrashErrorContainer = () => render((
    <CrashErrorContainer
      onResolve={handleResolve}
    />
  ));

  it('should be renders error template contents', () => {
    const { container, getByTestId } = renderCrashErrorContainer();

    expect(container).toHaveTextContent('이런.. 오류가 발생했어요!');
    expect(container).toHaveTextContent('홈으로');
    expect(getByTestId('computer-image')).not.toBeNull();
  });

  it('handle Click event', () => {
    const { getByText } = renderCrashErrorContainer();

    fireEvent.click(getByText('홈으로'));

    expect(mockPush).toBeCalledWith('/');
    expect(handleResolve).toBeCalled();
  });
});

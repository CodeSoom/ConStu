import React from 'react';

import { useDispatch } from 'react-redux';

import { render, fireEvent } from '@testing-library/react';

import NotFoundContainer from './NotFoundContainer';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return {
      push: mockPush,
    };
  },
}));

describe('NotFoundContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
  });

  const renderNotFoundContainer = () => render((
    <NotFoundContainer />
  ));

  it('should be renders error template contents', () => {
    const { container } = renderNotFoundContainer();

    expect(container).toHaveTextContent('아무것도 없어요!');
    expect(container).toHaveTextContent('홈으로');
  });

  it('handle Click event', () => {
    const { getByText } = renderNotFoundContainer();

    fireEvent.click(getByText('홈으로'));

    expect(mockPush).toBeCalledWith('/');
    expect(dispatch).toBeCalledWith({
      type: 'common/resetError',
    });
  });
});

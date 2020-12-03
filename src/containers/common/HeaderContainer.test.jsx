import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render } from '@testing-library/react';

import HeaderContainer from './HeaderContainer';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('HeaderContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    mockPush.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      authReducer: {
        user: given.user,
      },
    }));
  });

  const renderHeaderContainer = () => render((
    <MemoryRouter>
      <HeaderContainer />
    </MemoryRouter>
  ));

  context('with user', () => {
    given('user', () => ('seungmin@naver.com'));

    it('renders Header text', () => {
      const { container } = renderHeaderContainer();

      expect(container).toHaveTextContent('제목(미정)');
      expect(container).toHaveTextContent('로그아웃');
    });

    it('logout event calls dispatch actions and redirection go to main page', () => {
      const { getByText } = renderHeaderContainer();

      const button = getByText('로그아웃');

      expect(button).not.toBeNull();

      fireEvent.click(button);

      expect(dispatch).toBeCalled();
      expect(mockPush).toBeCalledWith('/');
    });
  });

  context('without user', () => {
    given('user', () => (null));

    it('renders Header text', () => {
      const { container } = renderHeaderContainer();

      expect(container).toHaveTextContent('제목(미정)');
      expect(container).toHaveTextContent('로그인');
      expect(container).toHaveTextContent('회원가입');
    });
  });
});

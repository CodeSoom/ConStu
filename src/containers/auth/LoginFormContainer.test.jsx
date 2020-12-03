import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render, fireEvent } from '@testing-library/react';

import LoginFormContainer from './LoginFormContainer';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('LoginFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    mockPush.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      authReducer: {
        login: given.login,
        user: given.user,
        authError: given.authError,
      },
    }));
  });

  const renderLoginFormContainer = () => render((
    <LoginFormContainer />
  ));

  it('renders login form text', () => {
    given('login', () => ({
      userEmail: '',
      password: '',
    }));

    const { container, getByPlaceholderText } = renderLoginFormContainer();

    expect(container).toHaveTextContent('로그인');
    expect(getByPlaceholderText('이메일')).not.toBeNull();
    expect(getByPlaceholderText('비밀번호')).not.toBeNull();
  });

  describe('action dispatch in login page', () => {
    given('login', () => ({
      userEmail: '',
      password: '',
    }));

    it('change event calls dispatch', () => {
      const { getByPlaceholderText } = renderLoginFormContainer();

      const inputs = [
        { value: 'seungmin@naver.com', name: 'userEmail', placeholder: '이메일' },
        { value: '345', name: 'password', placeholder: '비밀번호' },
      ];

      inputs.forEach(({ name, value, placeholder }) => {
        const field = getByPlaceholderText(placeholder);

        expect(field).not.toBeNull();

        fireEvent.change(field, { target: { value, name } });

        expect(dispatch).toBeCalledWith({
          type: 'auth/changeAuthField',
          payload: {
            form: 'login',
            name,
            value,
          },
        });
      });
    });

    context('without validation error', () => {
      given('login', () => ({
        userEmail: 'example@example.com',
        password: '123456',
      }));

      it('submit event calls dispatch', () => {
        const { getByTestId } = renderLoginFormContainer();

        const button = getByTestId('auth-button');

        expect(button).not.toBeNull();

        fireEvent.submit(button);

        expect(dispatch).toBeCalled();
      });
    });

    context('with validation error', () => {
      given('login', () => ({
        userEmail: '',
        password: '',
      }));

      it('renders error message "There are some items that have not been entered."', () => {
        const { getByTestId, container } = renderLoginFormContainer();

        const button = getByTestId('auth-button');

        expect(button).not.toBeNull();

        fireEvent.submit(button);

        expect(dispatch).not.toBeCalled();

        expect(container).toHaveTextContent('입력이 안된 사항이 있습니다.');
      });
    });
  });

  describe('actions after login', () => {
    given('login', () => ({
      userEmail: '',
      password: '',
    }));
    context('when success auth to login', () => {
      given('user', () => ({
        user: 'seungmin@naver.com',
      }));

      it('redirection go to main page', () => {
        renderLoginFormContainer();

        expect(mockPush).toBeCalledWith('/');
      });
    });

    context('when failure auth to login', () => {
      given('authError', () => ({
        authError: 'error',
      }));

      it('renders error message', () => {
        const { container } = renderLoginFormContainer();

        expect(container).toHaveTextContent('로그인에 실패하였습니다.');

        expect(dispatch).toBeCalledWith({
          type: 'auth/clearAuthFields',
        });
      });
    });
  });
});

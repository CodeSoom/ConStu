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
      login: {
        userEmail: '',
        password: '',
      },
      user: given.user,
      authError: given.authError,
    }));
  });

  const renderLoginFormContainer = () => render((
    <LoginFormContainer />
  ));

  it('renders login form text', () => {
    const { container, getByPlaceholderText } = renderLoginFormContainer();

    expect(container).toHaveTextContent('로그인');
    expect(getByPlaceholderText('이메일')).not.toBeNull();
    expect(getByPlaceholderText('비밀번호')).not.toBeNull();
  });

  describe('action dispatch in login page', () => {
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
          type: 'application/changeAuthField',
          payload: {
            form: 'login',
            name,
            value,
          },
        });
      });
    });

    it('submit event calls dispatch', () => {
      const { getByTestId } = renderLoginFormContainer();

      const button = getByTestId('auth-button');

      expect(button).not.toBeNull();

      fireEvent.submit(button);

      expect(dispatch).toBeCalled();
    });
  });

  describe('actions after login', () => {
    context('when success auth to login', () => {
      given('user', () => ({
        user: 'seungmin@naver.com',
      }));

      it('redirection go to main page', () => {
        renderLoginFormContainer();

        expect(mockPush).toBeCalledWith('/');
      });
    });

    // TODO: 현재 authError는 콘솔 출력
    context('when failure auth to login', () => {
      given('authError', () => ({
        authError: 'error',
      }));
    });
  });
});

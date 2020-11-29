import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { render, fireEvent } from '@testing-library/react';

import RegisterFormContainer from './RegisterFormContainer';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('RegisterFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      register: {
        userEmail: '',
        password: '',
        passwordConfirm: '',
      },
      auth: given.auth,
      authError: given.authError,
    }));
  });

  const renderRegisterFormContainer = () => render((
    <MemoryRouter>
      <RegisterFormContainer />
    </MemoryRouter>
  ));

  it('renders register form text', () => {
    const { container, getByPlaceholderText } = renderRegisterFormContainer();

    expect(container).toHaveTextContent('회원가입');
    expect(getByPlaceholderText('이메일')).not.toBeNull();
    expect(getByPlaceholderText('비밀번호')).not.toBeNull();
    expect(getByPlaceholderText('비밀번호 확인')).not.toBeNull();
  });

  describe('action dispatch in register page', () => {
    it('change event calls dispatch', () => {
      const { getByPlaceholderText } = renderRegisterFormContainer();

      const inputs = [
        { value: 'seungmin@naver.com', name: 'userEmail', placeholder: '이메일' },
        { value: '345', name: 'password', placeholder: '비밀번호' },
        { value: '345', name: 'passwordConfirm', placeholder: '비밀번호 확인' },
      ];

      inputs.forEach(({ name, value, placeholder }) => {
        const field = getByPlaceholderText(placeholder);

        expect(field).not.toBeNull();

        fireEvent.change(field, { target: { value, name } });

        expect(dispatch).toBeCalledWith({
          type: 'application/changeAuthField',
          payload: {
            form: 'register',
            name,
            value,
          },
        });
      });
    });

    it('submit event calls dispatch', () => {
      const { getByTestId } = renderRegisterFormContainer();

      const button = getByTestId('auth-button');

      expect(button).not.toBeNull();

      fireEvent.submit(button);

      expect(dispatch).toBeCalled();
    });
  });

  describe('action after signing up', () => {
    context('when success auth to register', () => {
      given('auth', () => ({
        auth: 'seungmin@naver.com',
      }));

      it('go to login page', () => {
        renderRegisterFormContainer();

        expect(mockPush).toBeCalledWith('/login');
      });
    });

    // TODO: 현재 authError는 콘솔 출력
    context('when failure auth to register', () => {
      given('authError', () => ({
        authError: 'error',
      }));
    });
  });
});

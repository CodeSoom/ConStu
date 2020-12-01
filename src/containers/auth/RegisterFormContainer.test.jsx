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
    mockPush.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      user: given.user,
      auth: given.auth,
      authError: given.authError,
      register: given.register,
    }));
  });

  const renderRegisterFormContainer = () => render((
    <MemoryRouter>
      <RegisterFormContainer />
    </MemoryRouter>
  ));

  it('renders register form text', () => {
    given('register', () => ({
      userEmail: '',
      password: '',
      passwordConfirm: '',
    }));

    const { container, getByPlaceholderText } = renderRegisterFormContainer();

    expect(container).toHaveTextContent('회원가입');
    expect(getByPlaceholderText('이메일')).not.toBeNull();
    expect(getByPlaceholderText('비밀번호')).not.toBeNull();
    expect(getByPlaceholderText('비밀번호 확인')).not.toBeNull();
  });

  describe('action dispatch in register page', () => {
    it('change event calls dispatch', () => {
      given('register', () => ({
        userEmail: '',
        password: '',
        passwordConfirm: '',
      }));

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

    context('without validation error', () => {
      given('register', () => ({
        userEmail: 'seungmin@example.com',
        password: '123456',
        passwordConfirm: '123456',
      }));

      it('submit event calls dispatch', () => {
        const { getByTestId } = renderRegisterFormContainer();

        const button = getByTestId('auth-button');

        expect(button).not.toBeNull();

        fireEvent.submit(button);

        expect(dispatch).toBeCalled();
      });
    });

    context('with validation check error', () => {
      describe('When there is something that has not been entered', () => {
        given('register', () => ({
          userEmail: '',
          password: '',
          passwordConfirm: '',
        }));

        it('renders error message "There are some items that have not been entered."', () => {
          const { getByTestId, container } = renderRegisterFormContainer();

          const button = getByTestId('auth-button');

          expect(button).not.toBeNull();

          fireEvent.submit(button);

          expect(dispatch).not.toBeCalled();

          expect(container).toHaveTextContent('입력이 안된 사항이 있습니다.');
        });
      });

      describe('When the password and password confirmation value are different', () => {
        given('register', () => ({
          userEmail: 'seungmin@example.com',
          password: '1234561',
          passwordConfirm: '1232456',
        }));

        it('renders error message "The password is different."', () => {
          const { getByTestId, container } = renderRegisterFormContainer();

          const button = getByTestId('auth-button');

          expect(button).not.toBeNull();

          fireEvent.submit(button);

          expect(dispatch).toBeCalledWith({
            payload: {
              form: 'register',
              name: 'password',
              value: '',
            },
            type: 'application/changeAuthField',
          });

          expect(container).toHaveTextContent('비밀번호가 일치하지 않습니다.');
        });
      });
    });
  });

  describe('actions after signing up', () => {
    given('register', () => ({
      userEmail: '',
      password: '',
      passwordConfirm: '',
    }));

    context('when success auth to register', () => {
      given('auth', () => ({
        auth: 'seungmin@naver.com',
      }));

      it('go to login page', () => {
        renderRegisterFormContainer();

        expect(mockPush).toBeCalledWith('/login');
      });
    });

    context('when failure auth to register', () => {
      given('authError', () => ({
        authError: 'error',
      }));

      it('renders error message', () => {
        const { container } = renderRegisterFormContainer();

        expect(container).toHaveTextContent('회원가입에 실패하였습니다.');
      });
    });
  });

  describe('action after login', () => {
    given('register', () => ({
      userEmail: '',
      password: '',
      passwordConfirm: '',
    }));

    given('user', () => ({
      user: 'seungmin@naver.com',
    }));

    it('redirection go to main page', () => {
      renderRegisterFormContainer();

      expect(mockPush).toBeCalledWith('/');
    });
  });
});

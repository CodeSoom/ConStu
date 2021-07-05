import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';

import RegisterFormContainer from './RegisterFormContainer';
import MockTheme from '../../components/common/test/MockTheme';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return {
      push: mockPush,
    };
  },
}));

describe('RegisterFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    mockPush.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      authReducer: {
        user: given.user,
        auth: given.auth,
        authError: given.authError,
      },
    }));
  });

  const renderRegisterFormContainer = () => render((
    <MockTheme>
      <MemoryRouter>
        <RegisterFormContainer />
      </MemoryRouter>
    </MockTheme>
  ));

  it('renders register form text', () => {
    const { container, getByPlaceholderText } = renderRegisterFormContainer();

    expect(container).toHaveTextContent('회원가입');
    expect(getByPlaceholderText('이메일')).not.toBeNull();
    expect(getByPlaceholderText('비밀번호')).not.toBeNull();
    expect(getByPlaceholderText('비밀번호 확인')).not.toBeNull();
  });

  describe('action dispatch in register page', () => {
    context('without validation error', () => {
      const inputs = [
        { value: 'test@example.com', name: 'userEmail', placeholder: '이메일' },
        { value: '123456', name: 'password', placeholder: '비밀번호' },
        { value: '123456', name: 'passwordConfirm', placeholder: '비밀번호 확인' },
      ];

      it('submit event calls dispatch', async () => {
        const { getByTestId, getByPlaceholderText } = renderRegisterFormContainer();

        const button = getByTestId('auth-button');

        expect(button).not.toBeNull();

        await act(async () => {
          inputs.forEach(({ name, value, placeholder }) => {
            const field = getByPlaceholderText(placeholder);

            expect(field).not.toBeNull();

            fireEvent.change(field, { target: { value, name } });
          });
        });

        await act(async () => {
          fireEvent.submit(button);
        });

        expect(dispatch).toBeCalledTimes(1);
      });
    });

    context('with validation check error', () => {
      describe('When there is something that has not been entered', () => {
        it('renders error message "There are some items that have not been entered."', async () => {
          const { getByTestId, container } = renderRegisterFormContainer();

          const button = getByTestId('auth-button');

          expect(button).not.toBeNull();

          await act(async () => {
            fireEvent.submit(button);
          });
          expect(dispatch).not.toBeCalled();

          expect(container).toHaveTextContent('입력이 안된 사항이 있습니다.');
        });
      });

      describe('When the password and password confirmation value are different', () => {
        const inputs = [
          { value: 'test@example.com', name: 'userEmail', placeholder: '이메일' },
          { value: '654321', name: 'password', placeholder: '비밀번호' },
          { value: '123456', name: 'passwordConfirm', placeholder: '비밀번호 확인' },
        ];

        it('renders error message "The password is different."', async () => {
          const { getByTestId, container, getByPlaceholderText } = renderRegisterFormContainer();

          const button = getByTestId('auth-button');

          expect(button).not.toBeNull();

          await act(async () => {
            inputs.forEach(({ name, value, placeholder }) => {
              const field = getByPlaceholderText(placeholder);

              expect(field).not.toBeNull();

              fireEvent.change(field, { target: { value, name } });
            });
          });

          await act(async () => {
            fireEvent.submit(button);
          });

          expect(dispatch).not.toBeCalled();
          expect(getByPlaceholderText('비밀번호')).toHaveValue('');
          expect(container).toHaveTextContent('비밀번호가 일치하지 않습니다.');
        });
      });
    });
  });

  describe('actions after signing up', () => {
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
    given('user', () => ({
      user: 'seungmin@naver.com',
    }));

    it('redirection go to main page', () => {
      renderRegisterFormContainer();

      expect(mockPush).toBeCalledWith('/');
    });
  });
});

import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';

import LoginFormContainer from './LoginFormContainer';
import MockTheme from '../../components/common/test/MockTheme';

const mockBack = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return {
      goBack: mockBack,
    };
  },
}));

describe('LoginFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    mockBack.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      authReducer: {
        user: given.user,
        authError: given.authError,
      },
    }));
  });

  const renderLoginFormContainer = () => render((
    <MockTheme>
      <MemoryRouter>
        <LoginFormContainer />
      </MemoryRouter>
    </MockTheme>
  ));

  it('renders login form text', () => {
    const { container, getByPlaceholderText } = renderLoginFormContainer();

    expect(container).toHaveTextContent('로그인');
    expect(getByPlaceholderText('이메일')).not.toBeNull();
    expect(getByPlaceholderText('비밀번호')).not.toBeNull();
  });

  describe('action dispatch in login page', () => {
    context('without validation error', () => {
      const inputs = [
        { value: 'test@test.com', name: 'userEmail', placeholder: '이메일' },
        { value: '111111', name: 'password', placeholder: '비밀번호' },
      ];

      it('submit event calls dispatch', async () => {
        const { getByTestId, getByPlaceholderText } = renderLoginFormContainer();

        const button = getByTestId('auth-button');

        await act(async () => {
          inputs.forEach(({ name, value, placeholder }) => {
            const field = getByPlaceholderText(placeholder);

            expect(field).not.toBeNull();

            fireEvent.change(field, { target: { value, name } });
          });
        });

        expect(button).not.toBeNull();

        await act(async () => {
          fireEvent.submit(button);
        });

        expect(dispatch).toBeCalledTimes(1);
      });
    });

    context('with validation error', () => {
      it('renders error message "There are some items that have not been entered."', async () => {
        const { getByTestId, container } = renderLoginFormContainer();

        const button = getByTestId('auth-button');

        expect(button).not.toBeNull();

        await act(async () => {
          fireEvent.submit(button);
        });

        expect(dispatch).not.toBeCalled();

        expect(container).toHaveTextContent('입력이 안된 사항이 있습니다.');
      });
    });
  });

  describe('actions after login', () => {
    context('when success auth to login', () => {
      given('user', () => ({
        user: 'seungmin@naver.com',
      }));

      it('Go to back Page', () => {
        renderLoginFormContainer();

        expect(mockBack).toBeCalledTimes(1);
      });
    });

    context('when failure auth to login', () => {
      given('authError', () => ({
        authError: 'error',
      }));

      it('renders error message', () => {
        const { container } = renderLoginFormContainer();

        expect(container).toHaveTextContent('로그인에 실패하였습니다.');
      });
    });
  });
});

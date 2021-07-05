import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import AuthForm from './AuthForm';
import MockTheme from '../common/test/MockTheme';

describe('AuthForm', () => {
  const handleSubmit = jest.fn();
  const mockRegister = jest.fn();

  beforeEach(() => {
    handleSubmit.mockClear();
    mockRegister.mockClear();
  });

  const renderAuthForm = ({ type, error = '' }) => render((
    <MockTheme>
      <MemoryRouter>
        <AuthForm
          type={type}
          error={error}
          register={mockRegister}
          onSubmit={handleSubmit}
        />
      </MemoryRouter>
    </MockTheme>
  ));

  context('Has error status', () => {
    const state = {
      type: 'login',
      error: '에러!',
    };

    it('renders error message', () => {
      const { container } = renderAuthForm(state);

      expect(container).toHaveTextContent('에러!');
    });
  });

  context("hasn't error status", () => {
    context('when type is login', () => {
      const login = {
        type: 'login',
      };

      it('renders login form text', () => {
        const { container, getByPlaceholderText } = renderAuthForm(login);

        expect(container).toHaveTextContent('로그인');
        expect(getByPlaceholderText('이메일')).not.toBeNull();
        expect(getByPlaceholderText('비밀번호')).not.toBeNull();
      });

      it('renders register link', () => {
        const { getByTestId } = renderAuthForm(login);

        const link = getByTestId('sign-up-link');

        expect(link).not.toBeNull();
      });
    });

    context('when type is register', () => {
      const register = {
        type: 'register',
      };

      it('renders register form text', () => {
        const { container, getByPlaceholderText } = renderAuthForm(register);

        expect(container).toHaveTextContent('회원가입');
        expect(getByPlaceholderText('이메일')).not.toBeNull();
        expect(getByPlaceholderText('비밀번호')).not.toBeNull();
        expect(getByPlaceholderText('비밀번호 확인')).not.toBeNull();
      });
    });
  });
});

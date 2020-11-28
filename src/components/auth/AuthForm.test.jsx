import React from 'react';

import { render } from '@testing-library/react';

import AuthForm from './AuthForm';

describe('AuthForm', () => {
  const renderAuthForm = ({ type }) => render((
    <AuthForm type={type} />
  ));

  context('when type is login', () => {
    const login = {
      type: 'Login',
    };

    it('renders login form text', () => {
      const { container, getByPlaceholderText } = renderAuthForm(login);

      expect(container).toHaveTextContent('Login');
      expect(getByPlaceholderText('이메일')).not.toBeNull();
      expect(getByPlaceholderText('비밀번호')).not.toBeNull();
    });
  });

  context('when type is register', () => {
    const register = {
      type: 'Register',
    };

    it('renders register form text', () => {
      const { container, getByPlaceholderText } = renderAuthForm(register);

      expect(container).toHaveTextContent('Register');
      expect(getByPlaceholderText('이메일')).not.toBeNull();
      expect(getByPlaceholderText('비밀번호')).not.toBeNull();
      expect(getByPlaceholderText('비밀번호 확인')).not.toBeNull();
    });
  });
});

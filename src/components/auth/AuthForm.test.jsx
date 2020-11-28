import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import AuthForm from './AuthForm';

describe('AuthForm', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
  });

  const renderAuthForm = ({ type, fields }) => render((
    <AuthForm
      type={type}
      fields={fields}
      onChange={handleChange}
    />
  ));

  context('when type is login', () => {
    const login = {
      type: 'login',
      fields: {
        userEmail: 'tktmdals@naver.com',
        password: '1234',
      },
    };

    it('renders login form text', () => {
      const { container, getByPlaceholderText } = renderAuthForm(login);

      expect(container).toHaveTextContent('로그인');
      expect(getByPlaceholderText('이메일')).not.toBeNull();
      expect(getByPlaceholderText('비밀번호')).not.toBeNull();
    });

    it('listens event call change', () => {
      const { getByPlaceholderText } = renderAuthForm(login);

      const inputs = [
        { value: 'seungmin@naver.com', name: 'userEmail', placeholder: '이메일' },
        { value: '345', name: 'password', placeholder: '비밀번호' },
      ];

      inputs.forEach(({ name, value, placeholder }) => {
        const field = getByPlaceholderText(placeholder);

        expect(field).not.toBeNull();

        fireEvent.change(field, { target: { value, name } });

        expect(handleChange).toBeCalled();
      });
    });
  });

  context('when type is register', () => {
    const register = {
      type: 'register',
      fields: {
        userEmail: 'tktmdals@naver.com',
        password: '1234',
        passwordConfirm: '1234',
      },
    };

    it('renders register form text', () => {
      const { container, getByPlaceholderText } = renderAuthForm(register);

      expect(container).toHaveTextContent('회원가입');
      expect(getByPlaceholderText('이메일')).not.toBeNull();
      expect(getByPlaceholderText('비밀번호')).not.toBeNull();
      expect(getByPlaceholderText('비밀번호 확인')).not.toBeNull();
    });

    it('listens event call change', () => {
      const { getByPlaceholderText } = renderAuthForm(register);

      const inputs = [
        { value: 'seungmin@naver.com', name: 'userEmail', placeholder: '이메일' },
        { value: '345', name: 'password', placeholder: '비밀번호' },
        { value: '345', name: 'passwordConfirm', placeholder: '비밀번호 확인' },
      ];

      inputs.forEach(({ name, value, placeholder }) => {
        const field = getByPlaceholderText(placeholder);

        expect(field).not.toBeNull();

        fireEvent.change(field, { target: { value, name } });

        expect(handleChange).toBeCalled();
      });
    });
  });
});

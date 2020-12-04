import React from 'react';

import styled from '@emotion/styled';

import Responsive from '../../styles/Responsive';

const AuthFormWrapper = styled(Responsive)``;

const FORM_TYPE = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = ({
  type, fields, onChange, onSubmit, error,
}) => {
  const formType = FORM_TYPE[type];

  const { userEmail, password } = fields;

  const handleChange = (e) => {
    const { name, value } = e.target;

    onChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit();
  };

  return (
    <AuthFormWrapper>
      <h2>{formType}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userEmail}
          name="userEmail"
          placeholder="이메일"
          autoComplete="email"
          onChange={handleChange}
        />
        <input
          type="password"
          value={password}
          name="password"
          placeholder="비밀번호"
          autoComplete="password"
          onChange={handleChange}
        />
        {type === 'register' && (
          <input
            type="password"
            value={fields.passwordConfirm}
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            autoComplete="new-password"
            onChange={handleChange}
          />
        )}
        {error && (
          <div>{error}</div>
        )}
        <button
          data-testid="auth-button"
          type="submit"
        >
          {formType}
        </button>
      </form>
    </AuthFormWrapper>
  );
};

export default AuthForm;
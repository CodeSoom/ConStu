import React from 'react';

import styled from '@emotion/styled';

import Responsive from '../../styles/Responsive';

const AuthFormWrapper = styled(Responsive)``;

const FORM_TYPE = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = ({ type, onChange, fields }) => {
  const formType = FORM_TYPE[type];

  const { userEmail, password } = fields;

  const handleChange = (e) => {
    const { name, value } = e.target;

    onChange({ name, value });
  };

  return (
    <AuthFormWrapper>
      <h2>{formType}</h2>
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
    </AuthFormWrapper>
  );
};

export default AuthForm;

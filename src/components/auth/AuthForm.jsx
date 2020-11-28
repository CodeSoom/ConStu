import React from 'react';

import styled from '@emotion/styled';

const AuthFormWrapper = styled.div``;

const AuthForm = ({ type }) => (
  <AuthFormWrapper>
    <h2>{type}</h2>
    <input type="text" placeholder="이메일" />
    <input type="password" placeholder="비밀번호" />
    {type === 'Register' && (
      <input type="password" placeholder="비밀번호 확인" />
    )}

  </AuthFormWrapper>
);

export default AuthForm;

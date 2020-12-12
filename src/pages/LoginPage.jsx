import React from 'react';

import { Helmet } from 'react-helmet';

import LoginFormContainer from '../containers/auth/LoginFormContainer';

const LoginPage = () => (
  <>
    <Helmet>
      <title>로그인</title>
    </Helmet>
    <LoginFormContainer />
  </>
);

export default LoginPage;

import React from 'react';

import { Helmet } from 'react-helmet';

import RegisterFormContainer from '../containers/auth/RegisterFormContainer';

const RegisterPage = () => (
  <>
    <Helmet>
      <title>회원가입</title>
    </Helmet>
    <RegisterFormContainer />
  </>
);

export default RegisterPage;

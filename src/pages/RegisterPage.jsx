import React from 'react';

import { Helmet } from 'react-helmet';

import { REGISTER } from '../util/constants/constants';

import RegisterFormContainer from '../containers/auth/RegisterFormContainer';

const RegisterPage = () => (
  <>
    <Helmet>
      <title>{REGISTER}</title>
    </Helmet>
    <RegisterFormContainer />
  </>
);

export default RegisterPage;

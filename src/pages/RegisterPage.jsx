import React from 'react';

import { Helmet } from 'react-helmet';

import { REGISTER } from '../util/constants/constants';

import HeaderContainer from '../containers/base/HeaderContainer';
import RegisterFormContainer from '../containers/auth/RegisterFormContainer';

const RegisterPage = () => (
  <>
    <Helmet>
      <title>{`ConStu | ${REGISTER}`}</title>
    </Helmet>
    <HeaderContainer />
    <RegisterFormContainer />
  </>
);

export default RegisterPage;

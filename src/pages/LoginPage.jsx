import React from 'react';

import { Helmet } from 'react-helmet-async';

import { LOGIN } from '../util/constants/constants';

import HeaderContainer from '../containers/base/HeaderContainer';
import LoginFormContainer from '../containers/auth/LoginFormContainer';

const LoginPage = () => (
  <>
    <Helmet>
      <title>{`ConStu | ${LOGIN}`}</title>
    </Helmet>
    <HeaderContainer />
    <LoginFormContainer />
  </>
);

export default LoginPage;

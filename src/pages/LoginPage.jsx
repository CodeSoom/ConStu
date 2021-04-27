import React from 'react';

import { Helmet } from 'react-helmet';

import { LOGIN } from '../util/constants/constants';

import LoginFormContainer from '../containers/auth/LoginFormContainer';

const LoginPage = () => (
  <>
    <Helmet>
      <title>{`ConStu | ${LOGIN}`}</title>
    </Helmet>
    <LoginFormContainer />
  </>
);

export default LoginPage;

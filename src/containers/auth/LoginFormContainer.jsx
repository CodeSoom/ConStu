import React, { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { get } from '../../util/utils';
import { changeAuthField } from '../../reducers/slice';

import AuthForm from '../../components/auth/AuthForm';

const LoginFormContainer = () => {
  const dispatch = useDispatch();

  const login = useSelector(get('login'));

  const onChangeLoginField = useCallback(({ name, value }) => {
    dispatch(
      changeAuthField({
        form: 'login',
        name,
        value,
      }),
    );
  });

  return (
    <AuthForm
      type="login"
      fields={login}
      onChange={onChangeLoginField}
    />
  );
};

export default LoginFormContainer;

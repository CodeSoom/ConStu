import React, { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { get } from '../../util/utils';
import { changeAuthField } from '../../reducers/slice';

import AuthForm from '../../components/auth/AuthForm';

const RegisterFormContainer = () => {
  const dispatch = useDispatch();

  const register = useSelector(get('register'));

  const onChangeRegisterField = useCallback(({ name, value }) => {
    dispatch(
      changeAuthField({
        form: 'register',
        name,
        value,
      }),
    );
  });

  return (
    <AuthForm
      type="register"
      onChange={onChangeRegisterField}
      fields={register}
    />
  );
};

export default RegisterFormContainer;

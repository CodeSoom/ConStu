import React, { useCallback, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { get } from '../../util/utils';
import { changeAuthField, clearAuth, requestRegister } from '../../reducers/slice';

import AuthForm from '../../components/auth/AuthForm';

const RegisterFormContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const register = useSelector(get('register'));
  const auth = useSelector(get('auth'));
  const authError = useSelector(get('authError'));

  const onChangeRegisterField = useCallback(({ name, value }) => {
    dispatch(
      changeAuthField({
        form: 'register',
        name,
        value,
      }),
    );
  }, [dispatch]);

  const onSubmit = useCallback(() => {
    dispatch(requestRegister());
  }, [dispatch]);

  useEffect(() => {
    if (auth) {
      history.push('/login');
    }

    if (authError) {
      // TODO: 추 후 error 처리
      console.error(authError);
    }

    return () => {
      dispatch(clearAuth());
    };
  }, [dispatch, auth, authError]);

  return (
    <AuthForm
      type="register"
      fields={register}
      onChange={onChangeRegisterField}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterFormContainer;

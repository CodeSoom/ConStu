import React, { useCallback, useEffect } from 'react';

import { useUnmount } from 'react-use';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { get } from '../../util/utils';
import {
  changeAuthField, clearAuth, clearAuthFields, requestRegister,
} from '../../reducers/slice';

import AuthForm from '../../components/auth/AuthForm';

const RegisterFormContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const register = useSelector(get('register'));
  const auth = useSelector(get('auth'));
  const user = useSelector(get('user'));
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
    // TODO: 회원가입 validation 체크 로직 추가

    dispatch(requestRegister());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user]);

  useEffect(() => {
    if (auth) {
      history.push('/login');
    }

    if (authError) {
      // TODO: error 처리 추가
      console.error(authError);
    }
  }, [auth, authError]);

  useUnmount(() => {
    dispatch(clearAuthFields());
    dispatch(clearAuth());
  });

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

import React, { useCallback, useEffect } from 'react';

import { useUnmount } from 'react-use';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { get } from '../../util/utils';
import {
  changeAuthField, clearAuth, clearAuthFields, requestLogin,
} from '../../reducers/slice';

import AuthForm from '../../components/auth/AuthForm';

const LoginFormContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const login = useSelector(get('login'));
  const user = useSelector(get('user'));
  const authError = useSelector(get('authError'));

  const onChangeLoginField = useCallback(({ name, value }) => {
    dispatch(
      changeAuthField({
        form: 'login',
        name,
        value,
      }),
    );
  });

  const onSubmit = useCallback(() => {
    // TODO: 로그인 validation 체크 로직 추가

    dispatch(requestLogin());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');
    }

    if (authError) {
      // TODO: error 처리 추가
      console.error(authError);
    }
  }, [user, authError]);

  useUnmount(() => {
    dispatch(clearAuthFields());
    dispatch(clearAuth());
  });

  return (
    <AuthForm
      type="login"
      fields={login}
      onChange={onChangeLoginField}
      onSubmit={onSubmit}
    />
  );
};

export default LoginFormContainer;

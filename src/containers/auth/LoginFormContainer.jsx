import React, { useCallback, useEffect, useState } from 'react';

import { useUnmount } from 'react-use';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAuth, isCheckValidate } from '../../util/utils';
import {
  changeAuthField, clearAuth, clearAuthFields, requestLogin,
} from '../../reducers/authSlice';
import { ERROR_MESSAGE, FIREBASE_AUTH_ERROR_MESSAGE } from '../../util/constants/messages';

import AuthForm from '../../components/auth/AuthForm';

const { NO_INPUT, FAILURE_LOGIN } = ERROR_MESSAGE;

const LoginFormContainer = () => {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const login = useSelector(getAuth('login'));
  const user = useSelector(getAuth('user'));
  const authError = useSelector(getAuth('authError'));

  const onChangeLoginField = useCallback(({ name, value }) => {
    dispatch(
      changeAuthField({
        form: 'login',
        name,
        value,
      }),
    );
  });

  const onSubmit = () => {
    const { userEmail, password } = login;

    if (isCheckValidate([userEmail, password])) {
      setError(NO_INPUT);
      return;
    }

    dispatch(requestLogin());
  };

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user, history]);

  useEffect(() => {
    if (authError) {
      setError(
        FIREBASE_AUTH_ERROR_MESSAGE[authError]
        || FAILURE_LOGIN,
      );
      dispatch(clearAuthFields());
      return;
    }

    setError(null);
  }, [authError, dispatch]);

  useUnmount(() => {
    dispatch(clearAuthFields());
    dispatch(clearAuth());
  });

  return (
    <AuthForm
      type="login"
      error={error}
      fields={login}
      onChange={onChangeLoginField}
      onSubmit={onSubmit}
    />
  );
};

export default LoginFormContainer;

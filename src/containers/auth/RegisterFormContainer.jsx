import React, { useCallback, useEffect, useState } from 'react';

import { useUnmount } from 'react-use';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { clearAuth, requestRegister } from '../../reducers/authSlice';

import { getAuth, isNullFields } from '../../util/utils';
import { ERROR_MESSAGE, FIREBASE_AUTH_ERROR_MESSAGE } from '../../util/constants/messages';

import AuthForm from '../../components/auth/AuthForm';

const { NO_INPUT, NOT_MATCH_PASSWORD, FAILURE_REGISTER } = ERROR_MESSAGE;

const RegisterFormContainer = () => {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const auth = useSelector(getAuth('auth'));
  const user = useSelector(getAuth('user'));
  const authError = useSelector(getAuth('authError'));

  const onSubmit = useCallback((formData) => {
    const { userEmail, password, passwordConfirm } = formData;

    if (isNullFields(formData)) {
      setError(NO_INPUT);
      return;
    }

    if (password !== passwordConfirm) {
      setError(NOT_MATCH_PASSWORD);
      return;
    }

    dispatch(requestRegister({ userEmail, password }));
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
      setError(
        FIREBASE_AUTH_ERROR_MESSAGE[authError]
        || FAILURE_REGISTER,
      );
      return;
    }

    setError(null);
  }, [auth, authError]);

  useUnmount(() => {
    dispatch(clearAuth());
  });

  return (
    <AuthForm
      type="register"
      error={error}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterFormContainer;

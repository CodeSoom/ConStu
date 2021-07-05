import React, { useCallback, useEffect, useState } from 'react';

import { useUnmount } from 'react-use';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { clearAuth, requestLogin } from '../../reducers/authSlice';

import { getAuth, isNullFields } from '../../util/utils';
import { ERROR_MESSAGE, FIREBASE_AUTH_ERROR_MESSAGE } from '../../util/constants/messages';

import AuthForm from '../../components/auth/AuthForm';

const { NO_INPUT, FAILURE_LOGIN } = ERROR_MESSAGE;

const LoginFormContainer = () => {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(getAuth('user'));
  const authError = useSelector(getAuth('authError'));

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = useCallback((formData) => {
    if (isNullFields(formData)) {
      setError(NO_INPUT);
      return;
    }

    dispatch(requestLogin(formData));
  }, [dispatch]);

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
      setValue('password', '');

      return;
    }

    setError(null);
  }, [authError, dispatch]);

  useUnmount(() => {
    dispatch(clearAuth());
  });

  return (
    <AuthForm
      type="login"
      error={error}
      register={register}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default LoginFormContainer;

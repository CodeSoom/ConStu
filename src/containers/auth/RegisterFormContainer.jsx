import React, { useCallback, useEffect, useState } from 'react';

import { useUnmount } from 'react-use';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ERROR_MESSAGE, FIREBASE_AUTH_ERROR_MESSAGE } from '../../util/messages';
import { get, isCheckValidate } from '../../util/utils';
import {
  changeAuthField, clearAuth, clearAuthFields, requestRegister,
} from '../../reducers/slice';

import AuthForm from '../../components/auth/AuthForm';

const { NO_INPUT, NOT_MATCH_PASSWORD, FAILURE_REGISTER } = ERROR_MESSAGE;

const RegisterFormContainer = () => {
  const [error, setError] = useState(null);

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

  const onSubmit = () => {
    const { userEmail, password, passwordConfirm } = register;

    if (isCheckValidate([userEmail, password, passwordConfirm])) {
      setError(NO_INPUT);
      return;
    }

    if (password !== passwordConfirm) {
      setError(NOT_MATCH_PASSWORD);
      dispatch(changeAuthField({ form: 'register', name: 'password', value: '' }));
      dispatch(changeAuthField({ form: 'register', name: 'passwordConfirm', value: '' }));
      return;
    }

    dispatch(requestRegister());
  };

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
    }
  }, [auth, authError]);

  useUnmount(() => {
    dispatch(clearAuthFields());
    dispatch(clearAuth());
  });

  return (
    <AuthForm
      type="register"
      error={error}
      fields={register}
      onChange={onChangeRegisterField}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterFormContainer;

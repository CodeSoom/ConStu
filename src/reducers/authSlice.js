import { createSlice } from '@reduxjs/toolkit';

import produce from 'immer';

import {
  postUserLogin,
  postUserLogout,
  postUserRegister,
} from '../services/api';

import { removeItem, saveItem } from '../services/storage';

const authInitialState = {
  register: {
    userEmail: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    userEmail: '',
    password: '',
  },
};

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState: {
    login: authInitialState.login,
    register: authInitialState.register,
    user: null,
    auth: null,
    authError: null,
  },

  reducers: {
    changeAuthField(state, { payload: { form, name, value } }) {
      return produce(state, (draft) => {
        draft[form][name] = value;
      });
    },

    clearAuthFields(state) {
      const { login, register } = authInitialState;
      return {
        ...state,
        register,
        login,
      };
    },

    setAuth(state, { payload: auth }) {
      return {
        ...state,
        auth,
      };
    },

    setAuthError(state, { payload: error }) {
      return {
        ...state,
        authError: error,
      };
    },

    clearAuth(state) {
      return {
        ...state,
        auth: null,
        authError: null,
      };
    },

    setUser(state, { payload: user }) {
      return {
        ...state,
        user,
      };
    },

    logout(state) {
      return {
        ...state,
        user: null,
      };
    },
  },
});

export const {
  changeAuthField,
  clearAuthFields,
  setAuth,
  setAuthError,
  clearAuth,
  setUser,
  logout,
} = actions;

export const requestRegister = () => async (dispatch, getState) => {
  const { authReducer: { register } } = getState();

  const { userEmail, password } = register;

  try {
    const { user } = await postUserRegister({ userEmail, password });

    dispatch(setAuth(user.email));
  } catch (error) {
    dispatch(setAuthError(error.code));
  }
};

export const requestLogin = () => async (dispatch, getState) => {
  const { authReducer: { login } } = getState();

  const { userEmail, password } = login;

  try {
    const { user } = await postUserLogin({ userEmail, password });

    const { email } = user;

    saveItem('user', {
      email,
    });

    dispatch(setUser(email));
  } catch (error) {
    dispatch(setAuthError(error.code));
  }
};

export const requestLogout = () => async (dispatch) => {
  await postUserLogout();

  removeItem('user');

  dispatch(logout());
};

export default reducer;
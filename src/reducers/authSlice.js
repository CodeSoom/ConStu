import { createSlice } from '@reduxjs/toolkit';

import {
  postUserLogin,
  postUserLogout,
  postUserRegister,
  sendEmailVerification,
} from '../services/api';

import { isDevLevel } from '../util/utils';
import { removeItem, saveItem } from '../services/storage';

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    auth: null,
    authError: null,
  },

  reducers: {
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
  setAuth,
  setAuthError,
  clearAuth,
  setUser,
  logout,
} = actions;

export const requestRegister = (formData) => async (dispatch) => {
  try {
    const { user } = await postUserRegister(formData);

    dispatch(setAuth(user.email));
  } catch (error) {
    dispatch(setAuthError(error.code));
  }
};

export const requestLogin = (formData) => async (dispatch) => {
  try {
    const { user } = await postUserLogin(formData);

    const { email } = user;

    saveItem('user', { email });

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

export const requestEmailVerification = () => async (dispatch) => {
  try {
    await sendEmailVerification(isDevLevel(process.env.NODE_ENV));

    dispatch(setAuth(true));
  } catch (error) {
    dispatch(setAuthError(error.code));
  }
};

export default reducer;

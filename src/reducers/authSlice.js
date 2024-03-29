import { createSlice } from '@reduxjs/toolkit';

import {
  postUserLogin,
  postUserLogout,
  postUserRegister,
  sendEmailVerification,
  sendPasswordResetEmail,
  deleteUser,
  postReauthenticateWithCredential,
  updateUserProfile,
} from '../services/api';

import { isDevLevel } from '../util/utils';
import { removeItem, saveItem } from '../services/storage';

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    auth: null,
    authError: null,
    userDetail: null,
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
      saveItem('user', { email: user });

      return {
        ...state,
        user,
      };
    },

    setUserDetail(state, { payload: userDetail }) {
      return {
        ...state,
        userDetail,
      };
    },

    logout() {
      return {
        user: null,
        auth: null,
        authError: null,
        userDetail: null,
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
  setUserDetail,
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

    dispatch(setUser(user.email));
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

    dispatch(setAuth('CONFIRM_EMAIL'));
  } catch (error) {
    dispatch(setAuthError(error.code));
  }
};

export const requestResetPassword = () => async (dispatch, getState) => {
  const { authReducer: { user } } = getState();

  try {
    await sendPasswordResetEmail(user);

    dispatch(setAuth('CONFIRM_EMAIL'));
  } catch (error) {
    dispatch(setAuthError(error.code));
  }
};

export const requestDeleteUser = () => async (dispatch) => {
  try {
    await deleteUser();

    dispatch(setAuth('WITHDRAWAL'));

    removeItem('user');
  } catch (error) {
    dispatch(setAuthError(error.code));
  }
};

export const requestReauthenticateWithCredential = (password) => async (dispatch) => {
  try {
    await postReauthenticateWithCredential(password);

    dispatch(setAuth('REAUTHENTICATE'));
  } catch (error) {
    dispatch(setAuthError(error.code));
  }
};

export const requestUpdateProfile = (newProfile) => async (dispatch, getState) => {
  const { authReducer: { userDetail } } = getState();

  try {
    await updateUserProfile(newProfile);

    dispatch(setAuth('UPDATE_PROFILE'));
    dispatch(setUserDetail({
      ...userDetail,
      ...newProfile,
    }));
  } catch (error) {
    dispatch(setAuthError(error.code));
  }
};

export default reducer;

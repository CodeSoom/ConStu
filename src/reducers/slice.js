import { createSlice } from '@reduxjs/toolkit';

import produce from 'immer';

import {
  getStudyGroup,
  getStudyGroups,
  postStudyGroup,
  postUserLogin,
  postUserLogout,
  postUserRegister,
  updateParticipants,
} from '../services/api';
import { removeItem, saveItem } from '../services/storage';

const writeInitialState = {
  title: '',
  contents: '',
  moderatorId: '',
  applyEndDate: '',
  participants: [],
  personnel: '1',
  tags: [],
};

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
  name: 'application',
  initialState: {
    groups: [],
    group: null,
    groupId: null,
    user: null,
    auth: null,
    authError: null,
    writeField: writeInitialState,
    register: authInitialState.register,
    login: authInitialState.login,
  },

  reducers: {
    setStudyGroups(state, { payload: groups }) {
      return {
        ...state,
        groups,
      };
    },

    setStudyGroup(state, { payload: group }) {
      return {
        ...state,
        group,
      };
    },

    changeWriteField(state, { payload: { name, value } }) {
      const { writeField } = state;

      return {
        ...state,
        writeField: {
          ...writeField,
          [name]: value,
        },
      };
    },

    clearWriteFields(state) {
      return {
        ...state,
        writeField: writeInitialState,
        groupId: null,
      };
    },

    successWrite(state, { payload: groupId }) {
      return {
        ...state,
        groupId,
      };
    },

    changeAuthField(state, { payload: { form, name, value } }) {
      return produce(state, (draft) => {
        draft[form][name] = value;
      });
    },

    clearAuthFields(state) {
      const { register, login } = authInitialState;

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
  setStudyGroups,
  setStudyGroup,
  changeWriteField,
  clearWriteFields,
  successWrite,
  changeAuthField,
  clearAuthFields,
  setAuth,
  setAuthError,
  clearAuth,
  setUser,
  logout,
} = actions;

export const loadStudyGroups = (tag) => async (dispatch) => {
  const groups = await getStudyGroups(tag);

  dispatch(setStudyGroups(groups));
};

export const loadStudyGroup = (id) => async (dispatch) => {
  dispatch(setStudyGroup(null));

  const group = await getStudyGroup(id);

  dispatch(setStudyGroup({
    ...group,
    id,
  }));
};

export const writeStudyGroup = () => async (dispatch, getState) => {
  const { writeField, user } = getState();

  const groupId = await postStudyGroup(produce(writeField, (draft) => {
    draft.moderatorId = user;
    draft.participants.push(user);
  }));

  dispatch(successWrite(groupId));
  dispatch(clearWriteFields());
};

export const updateStudyGroup = () => async (dispatch, getState) => {
  const { group, user } = getState();

  const newGroup = produce(group, (draft) => {
    draft.participants.push(user);
  });

  await updateParticipants(newGroup);

  dispatch(setStudyGroup(newGroup));
};

export const requestRegister = () => async (dispatch, getState) => {
  const { register: { userEmail, password } } = getState();

  try {
    const { user } = await postUserRegister({ userEmail, password });

    dispatch(setAuth(user.email));
  } catch (error) {
    dispatch(setAuthError(error.code));
  }
};

export const requestLogin = () => async (dispatch, getState) => {
  const { login: { userEmail, password } } = getState();

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

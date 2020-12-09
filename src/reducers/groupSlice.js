import { createSlice } from '@reduxjs/toolkit';

import produce from 'immer';

import {
  getStudyGroup,
  getStudyGroups,
  postStudyGroup,
  updatePostParticipant,
  deletePostParticipant,
} from '../services/api';

const writeInitialState = {
  title: '',
  contents: '',
  moderatorId: '',
  applyEndDate: '',
  participants: [],
  personnel: '1',
  tags: [],
};

const applyInitialState = {
  reason: '',
  wantToGet: '',
};

const { actions, reducer } = createSlice({
  name: 'group',
  initialState: {
    groups: [],
    group: null,
    groupId: null,
    writeField: writeInitialState,
    applyFields: applyInitialState,
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
      return produce(state, (draft) => {
        draft.writeField[name] = value;
      });
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

    changeApplyFields(state, { payload: { name, value } }) {
      return produce(state, (draft) => {
        draft.applyFields[name] = value;
      });
    },

    clearApplyFields(state) {
      return {
        ...state,
        applyFields: applyInitialState,
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
  changeApplyFields,
  clearApplyFields,
} = actions;

export const loadStudyGroups = (tag) => async (dispatch) => {
  if (tag) {
    dispatch(setStudyGroups(null));
  }

  const groups = await getStudyGroups(tag);

  dispatch(setStudyGroups(groups));
};

export const loadStudyGroup = (id) => async (dispatch) => {
  dispatch(setStudyGroup(null));

  const group = await getStudyGroup(id);

  dispatch(setStudyGroup(group));
};

export const writeStudyGroup = () => async (dispatch, getState) => {
  const { groupReducer, authReducer } = getState();

  const { user } = authReducer;

  const groupId = await postStudyGroup(produce(groupReducer.writeField, (draft) => {
    draft.moderatorId = user;
    draft.participants.push({
      id: user,
    });
  }));

  dispatch(successWrite(groupId));
  dispatch(clearWriteFields());
};

export const updateParticipant = ({ reason, wantToGet }) => async (dispatch, getState) => {
  const { groupReducer: { group }, authReducer: { user } } = getState();

  const userInfo = {
    id: user,
    reason,
    wantToGet,
    confirm: false,
  };

  const newGroup = produce(group, (draft) => {
    draft.participants.push(userInfo);
  });

  await updatePostParticipant({
    user: userInfo,
    id: group.id,
  });

  dispatch(setStudyGroup(newGroup));
  dispatch(clearApplyFields());
};

export const deleteParticipant = () => async (dispatch, getState) => {
  const { groupReducer: { group }, authReducer: { user } } = getState();

  const participants = group.participants.filter(({ id }) => id !== user);

  const newGroup = {
    ...group,
    participants,
  };

  await deletePostParticipant({
    participants,
    id: group.id,
  });

  dispatch(setStudyGroup(newGroup));
};

export default reducer;

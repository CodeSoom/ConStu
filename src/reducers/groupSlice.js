import { createSlice } from '@reduxjs/toolkit';

import produce from 'immer';

import {
  getStudyGroup,
  getStudyGroups,
  postStudyGroup,
  updateParticipants,
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

const { actions, reducer } = createSlice({
  name: 'group',
  initialState: {
    groups: [],
    group: null,
    groupId: null,
    writeField: writeInitialState,
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
  },
});

export const {
  setStudyGroups,
  setStudyGroup,
  changeWriteField,
  clearWriteFields,
  successWrite,
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
  const { groupReducer, authReducer } = getState();

  const { user } = authReducer;

  const groupId = await postStudyGroup(produce(groupReducer.writeField, (draft) => {
    draft.moderatorId = user;
    draft.participants.push(user);
  }));

  dispatch(successWrite(groupId));
  dispatch(clearWriteFields());
};

export const updateStudyGroup = () => async (dispatch, getState) => {
  const { groupReducer, authReducer } = getState();

  const newGroup = produce(groupReducer.group, (draft) => {
    draft.participants.push(authReducer.user);
  });

  await updateParticipants(newGroup);

  dispatch(setStudyGroup(newGroup));
};

export default reducer;

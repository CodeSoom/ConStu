import { createSlice } from '@reduxjs/toolkit';

import {
  getStudyGroup,
  getStudyGroups,
} from '../services/api';

const { actions, reducer } = createSlice({
  name: 'application',
  initialState: {
    groups: [],
    group: null,
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
  },
});

export const {
  setStudyGroups,
  setStudyGroup,
} = actions;

export const loadStudyGroups = () => async (dispatch) => {
  const groups = await getStudyGroups();

  dispatch(setStudyGroups(groups));
};

export const loadStudyGroup = (id) => async (dispatch) => {
  const group = await getStudyGroup(id);

  dispatch(setStudyGroup(group));
};

export default reducer;

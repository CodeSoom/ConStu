import { createSlice } from '@reduxjs/toolkit';

import {
  getStudyGroups,
} from '../services/api';

const { actions, reducer } = createSlice({
  name: 'application',
  initialState: {
    groups: [],
  },
  reducers: {
    setStudyGroups(state, { payload: groups }) {
      return {
        ...state,
        groups,
      };
    },
  },
});

export const {
  setStudyGroups,
} = actions;

export function loadStudyGroups() {
  return async (dispatch) => {
    const groups = await getStudyGroups();

    dispatch(setStudyGroups(groups));
  };
}

export default reducer;

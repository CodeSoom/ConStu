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
    setStudyGroups(state, { payload: { groups, tag } }) {
      return {
        ...state,
        groups: tag ? groups.reduce((studies, group) => {
          if (group.tags.includes(tag)) {
            return [...studies, group];
          }

          return studies;
        }, []) : groups,
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

export const loadStudyGroups = (tag) => async (dispatch) => {
  const groups = await getStudyGroups();

  dispatch(setStudyGroups({ groups, tag }));
};

export const loadStudyGroup = (id) => async (dispatch) => {
  dispatch(setStudyGroup(null));

  const group = await getStudyGroup(id);

  dispatch(setStudyGroup(group));
};

export default reducer;

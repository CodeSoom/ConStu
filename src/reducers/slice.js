import { createSlice } from '@reduxjs/toolkit';

import {
  getStudyGroup,
  getStudyGroups,
} from '../services/api';

const writeInitialState = {
  title: '',
  contents: '',
  moderatorId: '',
  applyEndDate: '',
  participants: [],
  personnel: 0,
  tags: [],
};

const { actions, reducer } = createSlice({
  name: 'application',
  initialState: {
    groups: [],
    group: null,
    writeField: writeInitialState,
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
  },
});

export const {
  setStudyGroups,
  setStudyGroup,
  changeWriteField,
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

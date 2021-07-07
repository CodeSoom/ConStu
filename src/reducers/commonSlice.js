import { createSlice } from '@reduxjs/toolkit';

import { saveItem } from '../services/storage';
import { getInitTheme } from '../util/utils';

const { actions, reducer } = createSlice({
  name: 'common',
  initialState: {
    theme: getInitTheme(),
    errorType: null,
  },

  reducers: {
    changeTheme(state) {
      saveItem('theme', !state.theme);

      return {
        ...state,
        theme: !state.theme,
      };
    },
    setNotFound(state) {
      return {
        ...state,
        errorType: 'NOT_FOUND',
      };
    },
    resetError(state) {
      return {
        ...state,
        errorType: null,
      };
    },
  },
});

export const {
  changeTheme,
  setNotFound,
  resetError,
} = actions;

export default reducer;

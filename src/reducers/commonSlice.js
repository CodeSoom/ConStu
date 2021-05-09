import { createSlice } from '@reduxjs/toolkit';

import { saveItem, loadItem } from '../services/storage';
import { getTheme } from '../util/utils';

const { actions, reducer } = createSlice({
  name: 'common',
  initialState: {
    theme: getTheme(loadItem('theme')),
  },

  reducers: {
    changeTheme(state) {
      saveItem('theme', !state.theme);

      return {
        ...state,
        theme: !state.theme,
      };
    },
  },
});

export const {
  changeTheme,
} = actions;

export default reducer;

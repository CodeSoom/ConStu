import { createSlice } from '@reduxjs/toolkit';

import { saveItem } from '../services/storage';
import { getInitTheme } from '../util/utils';

const { actions, reducer } = createSlice({
  name: 'common',
  initialState: {
    theme: getInitTheme(),
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

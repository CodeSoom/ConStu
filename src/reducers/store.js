import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootSlice';

import { isDevLevel } from '../util/utils';

const store = configureStore({
  reducer: rootReducer,
  devTools: isDevLevel(process.env.NODE_ENV),
});

export default store;

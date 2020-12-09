import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import groupReducer from './groupSlice';

const rootReducer = combineReducers({
  authReducer,
  groupReducer,
});

export default rootReducer;

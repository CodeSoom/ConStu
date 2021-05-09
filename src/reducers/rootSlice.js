import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import groupReducer from './groupSlice';
import commonReducer from './commonSlice';

const rootReducer = combineReducers({
  authReducer,
  groupReducer,
  commonReducer,
});

export default rootReducer;

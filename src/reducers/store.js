import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import rootReducer from './rootSlice';

const store = configureStore({ reducer: rootReducer }, composeWithDevTools(createLogger()));

export default store;

import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import reducer from './slice';

const store = configureStore({ reducer }, composeWithDevTools(createLogger()));

export default store;

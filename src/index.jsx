import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import App from './App';

import store from './reducers/store';

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('app'),
);

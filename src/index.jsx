import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { HelmetProvider } from 'react-helmet-async';

import App from './App';

import store from './reducers/store';

ReactDOM.render(
  (
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  ),
  document.getElementById('app'),
);

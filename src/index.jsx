import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { HelmetProvider } from 'react-helmet-async';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import store from './reducers/store';
import { setUser, setUserDetail } from './reducers/authSlice';

import { isDevLevel } from './util/utils';
import { auth } from './services/firebase';
import { loadItem } from './services/storage';

import App from './App';

Sentry.init({
  dsn: !isDevLevel(process.env.NODE_ENV) && process.env.SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

const loadUser = () => {
  const user = loadItem('user');

  if (!user) {
    return;
  }

  const { email } = user;

  store.dispatch(setUser(email));
};

loadUser();

auth.onAuthStateChanged((user) => {
  if (!user) {
    return;
  }

  const {
    email, emailVerified, displayName, photoURL,
  } = user;

  store.dispatch(setUser(email));
  store.dispatch(setUserDetail({
    email,
    emailVerified,
    displayName,
    photoURL,
  }));
});

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

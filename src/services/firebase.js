import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

import devConfig from '../../config/dev';
import prodConfig from '../../config/prod';

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

firebase.initializeApp(config);

export const fireStore = firebase.firestore;

export const db = firebase.firestore();

export const auth = firebase.auth();

import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

import config from '../util/config';

firebase.initializeApp(config(process.env.NODE_ENV));

firebase.auth().languageCode = 'ko';

export const fireStore = firebase.firestore;

export const db = firebase.firestore();

export const auth = firebase.auth();

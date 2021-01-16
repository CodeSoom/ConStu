import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

import config from '../../config';

firebase.initializeApp(config);

export const fireStore = firebase.firestore;

export const db = firebase.firestore();

export const auth = firebase.auth();

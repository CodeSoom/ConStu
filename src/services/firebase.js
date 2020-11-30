import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATA_BASEURL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: 'AIzaSyBjs8RBGbIP7Ka4v1xdqnWTDs5UaoIFwao',
  authDomain: 'sweet-1cfff.firebaseapp.com',
  databaseURL: 'https://sweet-1cfff.firebaseio.com',
  projectId: 'sweet-1cfff',
  storageBucket: 'sweet-1cfff.appspot.com',
  messagingSenderId: '63498697269',
  appId: '1:63498697269:web:6a83cf1c3c2481ed390f7c',
  measurementId: 'G-97JRTTEZ0Z',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export const auth = firebase.auth();

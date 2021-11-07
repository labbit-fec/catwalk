import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCCdb1cpDWjm1LvB9KqSTwvuAR-oCZoo3M',
  authDomain: 'limitless-25d7a.firebaseapp.com',
  databaseURL: 'gs://limitless-25d7a.appspot.com',
  projectId: 'limitless-25d7a',
  storageBucket: 'limitless-25d7a.appspot.com',
  messagingSenderId: '10526228847',
  appId: '1:10526228847:web:8e69b9ea9ca6916d17689a',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };

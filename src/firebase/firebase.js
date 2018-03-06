import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAvTs-lkNpTiiAMFW7tMpFt5O-jVfIeXik",
  authDomain: "bug-tracker-d4f2d.firebaseapp.com",
  databaseURL: "https://bug-tracker-d4f2d.firebaseio.com",
  projectId: "bug-tracker-d4f2d",
  storageBucket: "bug-tracker-d4f2d.appspot.com",
  messagingSenderId: "1082364274663"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
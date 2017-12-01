import Rebase from 're-base';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAFm31_-YQigvIWlPreU8L_rCYFzPCc7hk",
  authDomain: "leapblog-d4899.firebaseapp.com",
  databaseURL: "https://leapblog-d4899.firebaseio.com",
  projectId: "leapblog-d4899",
  storageBucket: "leapblog-d4899.appspot.com",
  messagingSenderId: "683975512649"
}

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

export { base }
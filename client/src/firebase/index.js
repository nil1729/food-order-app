import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import firebaseConfig from './config';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const Provider = new firebase.auth.GoogleAuthProvider();
export default firebaseApp;
export { Provider };

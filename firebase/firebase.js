import firebase from "firebase";
import "firebase/auth";
import "firebase/messaging";
import { firebaseConfig } from '../config'

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export { auth, firebase };
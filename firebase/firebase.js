import firebase from "firebase";
import "firebase/auth";
import "firebase/messaging";
import 'firebase/firestore';
import { firebaseConfig } from "../config";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
export { auth, firebase, firestore };
// firebase.firestore()
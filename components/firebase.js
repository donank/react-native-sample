import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCZBrFAY1v9V4vdQ96G5rBWFwWr5uVadH0",
  authDomain: "neshm-45a98.firebaseapp.com",
  projectId: "neshm-45a98",
  storageBucket: "neshm-45a98.appspot.com",
  messagingSenderId: "746247787388",
  appId: "1:746247787388:web:2d5499b54c337ba16fcaf9",
  measurementId: "G-LKJSNRVFRB"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);
export const registerWithEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);
export const logout = () => auth.signOut();
export const passwordReset = email => auth.sendPasswordResetEmail(email);

export const addData = (collection, email, data) => firestore.collection(collection).doc(email).set(data);
export const searchSkill = (collection, type, condition, name) => firestore.collection(collection).where(type, condition, name);




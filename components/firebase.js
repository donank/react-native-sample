import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
import "firebase/storage";

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
export const firestorage = firebase.storage();

export const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);
export const registerWithEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);
export const logout = () => auth.signOut();
export const passwordReset = email => auth.sendPasswordResetEmail(email);

export const addData = (collection, email, data) => firestore.collection(collection).doc(email).set(data);
export const searchSkill = (collection, type, condition, name) => firestore.collection(collection).where(type, condition, name);
export const fetchSkills = () => firestore.collection('skills').get();
export const fetchSeeker = (collection, email) => firestore.collection(collection).doc(email).get();
export const fetchCourses = (id) => firestore.collection('skills').doc(id).get();
export const fetchTutor = (id) => firestore.collection('tutors').doc(id).get();
export const fetchTrendingCourses = (collection) => firestore.collection(collection).where("trending", '==', true);
export const fetchLocalTrendingCourses = (loc) => firestore.collection('skills').where("trending", '==', true).where("gmaploc", '==', loc).get();
export const fetchTags = () => firestore.collection('tags').get();
export const fetchTagById = (id) => firestore.collection('tags').doc(id).get();
export const updateCoordinates = (email, lat, long) => firestore.collection('seekers').doc(email).update({coordinates: {
  U: lat,
  k: long
}})

const arrayUnion = firebase.firestore.FieldValue.arrayUnion
export const updateMessageList = (seekerEmail, tutorEmail) => firestore.collection('seekers').doc(seekerEmail).update({
  messages: arrayUnion(tutorEmail)
})

const pfpStorageRef = firestorage.ref('pfp');
const heroStorageRef = firestorage.ref('hero');
export const uploadPfpTask = (email, file) => pfpStorageRef.child(email).put(file);
export const uploadHeroTask = (courseId, file) => heroStorageRef.child(courseId).put(file);




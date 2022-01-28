import firebase from 'firebase/compat/app';
import 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCtv1d2ebcDVJ6OQcArZP7imTe6V7nI5UQ",
    authDomain: "blockchain-management.firebaseapp.com",
    projectId: "blockchain-management",
    storageBucket: "blockchain-management.appspot.com",
    messagingSenderId: "1087770585080",
    appId: "1:1087770585080:web:73c38d94fe24ecceed980d",
    measurementId: "G-RQKSD5XC2F"
  };

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore()

export { firestore }
import firebase from 'firebase/compat/app';
import 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
    
  };

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore()

export { firestore }
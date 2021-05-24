import firebase from 'firebase/app'
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCLWCFpp2NM5GvqzQLL1WyPyypw8Rqw2S4",
    authDomain: "libros-3b3e8.firebaseapp.com",
    projectId: "libros-3b3e8",
    storageBucket: "libros-3b3e8.appspot.com",
    messagingSenderId: "794374889434",
    appId: "1:794374889434:web:413323f95fc45399b42ae3"
  };

  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore()
import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAYBwDH6VHrNhcYa5EKJB2zlaT8izTulmo",
    authDomain: "vue-todo-2021-febec.firebaseapp.com",
    databaseURL: "https://vue-todo-2021-febec-default-rtdb.firebaseio.com",
    projectId: "vue-todo-2021-febec",
    storageBucket: "vue-todo-2021-febec.appspot.com",
    messagingSenderId: "212877263435",
    appId: "1:212877263435:web:7f586bac06e37880a043ce"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
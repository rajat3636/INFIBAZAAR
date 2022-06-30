// import firebase from "firebase"
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyC5yX7MzlDttMp1dzmjNijf5nenOAZi1M8",
    authDomain: "challenge-3593b.firebaseapp.com",
    projectId: "challenge-3593b",
    storageBucket: "challenge-3593b.appspot.com",
    messagingSenderId: "527425781932",
    appId: "1:527425781932:web:72484bb104962a10d9df09",
    measurementId: "G-YE8XKH9ZC1"
}; 
  
const firebaseApp = firebase.initializeApp(firebaseConfig);  

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth }; 
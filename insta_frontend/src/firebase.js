import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyA7AIlj-RxKdM9joBIGsyYHrPp2hwDRH20",
    authDomain: "instagram-clone-86ec5.firebaseapp.com",
    projectId: "instagram-clone-86ec5",
    storageBucket: "instagram-clone-86ec5.appspot.com",
    messagingSenderId: "551005142483",
    appId: "1:551005142483:web:71678134d5bc1cb65f8326",
    measurementId: "G-0WY6P8P7B0"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth , provider};
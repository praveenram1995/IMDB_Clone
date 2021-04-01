import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFBzyC3xWZP89AL5VkYpryQFMugyvmNrk",
  authDomain: "imdb-8ea6a.firebaseapp.com",
  projectId: "imdb-8ea6a",
  storageBucket: "imdb-8ea6a.appspot.com",
  messagingSenderId: "186311098710",
  appId: "1:186311098710:web:ff69fce5a6ba6e33d9d6f7",
  measurementId: "G-GPTEXPPXEW"
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

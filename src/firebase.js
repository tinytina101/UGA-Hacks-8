// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//initialize firebases
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7s52v-K0xPyahln5FeB1nQ5pfaTcQUoI",
  authDomain: "uga-hacks-5aaad.firebaseapp.com",
  projectId: "uga-hacks-5aaad",
  storageBucket: "uga-hacks-5aaad.appspot.com",
  messagingSenderId: "155875587863",
  appId: "1:155875587863:web:82b5e52506ac816262a952",
  measurementId: "G-FXX88NQGMG",
};

// Initialize Firebase--represent all firebase connection with 'app'
const app = initializeApp(firebaseConfig);

//want ot access whi is auth n different files so export
export const auth = getAuth(app);
export default app;

export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

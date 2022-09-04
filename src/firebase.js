// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCzeakljxkTCSBE0KpxHXrqjFcDPY6mWwQ",
  authDomain: "blog-61935.firebaseapp.com",
  projectId: "blog-61935",
  storageBucket: "blog-61935.appspot.com",
  messagingSenderId: "175342749292",
  appId: "1:175342749292:web:e19ae4ba9b7744d72e7a49"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
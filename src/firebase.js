// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC68aO_JOS8ZLBjiKprEnrwHSp6O0UbfBU",
  authDomain: "blog-e466a.firebaseapp.com",
  projectId: "blog-e466a",
  storageBucket: "blog-e466a.appspot.com",
  messagingSenderId: "1079149345572",
  appId: "1:1079149345572:web:c364f7f44c15f1f19e11b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
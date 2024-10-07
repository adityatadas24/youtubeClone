// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth,GoogleAuthProvider}  from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCs-4j5b-GCQ6sHgqFfSBGfzOQ5Pnq9bIQ",
  authDomain: "clone-7d0ac.firebaseapp.com",
  projectId: "clone-7d0ac",
  storageBucket: "clone-7d0ac.appspot.com",
  messagingSenderId: "1021064311429",
  appId: "1:1021064311429:web:30b279ab934c537161afec",
  measurementId: "G-WX300TDE7E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()
export {auth,provider}
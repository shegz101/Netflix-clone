import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFeNLjk3aHis6t1NIPDMsZ5ErLucWQlaA",
  authDomain: "trailflix-e2f33.firebaseapp.com",
  projectId: "trailflix-e2f33",
  storageBucket: "trailflix-e2f33.appspot.com",
  messagingSenderId: "343605304524",
  appId: "1:343605304524:web:8f7db816226387c8bbb669",
  measurementId: "G-V8ME7R2WET",
};

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };

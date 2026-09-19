import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3M2W98yANVZXYpWStJzj7AeCOkp9WYyQ",
  authDomain: "elevate-learning-a6a0a.firebaseapp.com",
  projectId: "elevate-learning-a6a0a",
  storageBucket: "elevate-learning-a6a0a.firebasestorage.app",
  messagingSenderId: "657215396370",
  appId: "1:657215396370:web:aabe4a26356d43748cd6cb",
  measurementId: "G-M35XZ4GEV9",
};

const app = initializeApp(firebaseConfig);

// Firestore database
export const db = getFirestore(app);

// Firebase Authentication
export const auth = getAuth(app);
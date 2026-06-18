import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "elevate-learning-a6a0a.firebaseapp.com",
  projectId: "elevate-learning-a6a0a",
  storageBucket: "elevate-learning-a6a0a.firebasestorage.app",
  messagingSenderId: "657215396370",
  appId: "1:657215396370:web:aabe4a26356d43748cd6cb",
  measurementId: "G-M35XZ4GEV9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
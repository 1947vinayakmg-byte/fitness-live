import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAf_qd8FTNEXodJnfZXVFdjN6kQbnWVZsQ",
  authDomain: "fitness-city-gym.firebaseapp.com",
  projectId: "fitness-city-gym",
  storageBucket: "fitness-city-gym.firebasestorage.app",
  messagingSenderId: "231790753110",
  appId: "1:231790753110:web:ecd013ee0bfd3cc79612f7",
  measurementId: "G-Q70V5Q3T0S"
};

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgvrW6MGDJJFAbyNTH4rBlZBAux7UecUo",
  authDomain: "pomodorohero-a139d.firebaseapp.com",
  projectId: "pomodorohero-a139d",
  storageBucket: "pomodorohero-a139d.firebasestorage.app",
  messagingSenderId: "392504340540",
  appId: "1:392504340540:web:68b1d1bfc3f838831fd339"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
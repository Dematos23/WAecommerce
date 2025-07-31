
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { User } from 'firebase/auth';

// TODO: Replace with your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk43l3NBSKVQ23_FfYTkTFXcuXuVAl-6s",
  authDomain: "kima-oicw0.firebaseapp.com",
  projectId: "kima-oicw0",
  storageBucket: "kima-oicw0.appspot.com",
  messagingSenderId: "455412220645",
  appId: "1:455412220645:web:058af08ab957082ec80a0c"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };

export const getUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    }, () => {
      resolve(null);
    });
  });
};

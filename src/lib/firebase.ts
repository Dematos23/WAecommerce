
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk43l3NBSKVQ23_FfYTkTFXcuXuVAl-6s",
  authDomain: "kima-oicw0.firebaseapp.com",
  projectId: "kima-oicw0",
  storageBucket: "kima-oicw0.firebasestorage.app",
  messagingSenderId: "455412220645",
  appId: "1:455412220645:web:058af08ab957082ec80a0c"
};


// Initialize Firebase
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

const db = getFirestore(app);

export { app, db };

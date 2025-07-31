
import { initializeApp, getApps } from "firebase/app";

// TODO: Replace with your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwNVPI6hXhIO6HYGW0jx_ZKio7i3Gaotc",
  authDomain: "kima-23.firebaseapp.com",
  projectId: "kima-23",
  storageBucket: "kima-23.appspot.com",
  messagingSenderId: "1089592833446",
  appId: "1:1089592833446:web:55b76645b2c8c0b4394b67",
  measurementId: "G-EB9GGTXEBL"
};


// Initialize Firebase
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
}

export { app };

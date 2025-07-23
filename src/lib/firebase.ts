// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuEAakwjosnFS3FPl-qzDwZkqabnZ1RMo",
  authDomain: "ahadedigital.firebaseapp.com",
  databaseURL: "https://ahadedigital-default-rtdb.firebaseio.com",
  projectId: "ahadedigital",
  storageBucket: "ahadedigital.appspot.com",
  messagingSenderId: "367198720376",
  appId: "1:367198720376:web:1b1e608e317454f323b88d",
  measurementId: "G-1K1L94HHCJ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, database, auth, storage };

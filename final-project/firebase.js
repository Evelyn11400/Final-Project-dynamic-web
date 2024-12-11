// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHdw61cFxMz6bQZHZCp2Pf7xoi4ARe-TI",
  authDomain: "final-project-dynamic-web.firebaseapp.com",
  projectId: "final-project-dynamic-web",
  storageBucket: "final-project-dynamic-web.firebasestorage.app",
  messagingSenderId: "296400377340",
  appId: "1:296400377340:web:85a0482cfb613ad6f34e79",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDesPVfZimyigix_KLt3bRWKrq9j0bey28",
  authDomain: "internal-hackathon-28780.firebaseapp.com",
  projectId: "internal-hackathon-28780",
  storageBucket: "internal-hackathon-28780.appspot.com",
  messagingSenderId: "934489914366",
  appId: "1:934489914366:web:9daf2d21a5ab4623ab1eaf",
  measurementId: "G-RKDWENFPV5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const rtdb = getDatabase(app);

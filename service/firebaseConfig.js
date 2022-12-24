// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA51wlC8xk2dFGMgSNtQQ16VcV3L90k5Ks",
  authDomain: "sdkverocity.firebaseapp.com",
  projectId: "sdkverocity",
  storageBucket: "sdkverocity.appspot.com",
  messagingSenderId: "735056214173",
  appId: "1:735056214173:web:b92091ea8b88746ba23c74",
  measurementId: "G-YGDC4SJQ7V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);

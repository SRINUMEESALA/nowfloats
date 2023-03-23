// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAL82Yy20rinchDIURtj6Hpl3qsepSeoCI",
  authDomain: "nowfloats-e6606.firebaseapp.com",
  projectId: "nowfloats-e6606",
  storageBucket: "nowfloats-e6606.appspot.com",
  messagingSenderId: "1033542039340",
  appId: "1:1033542039340:web:03270f02c0553962a81e89",
  measurementId: "G-S00ZNH0WRR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();

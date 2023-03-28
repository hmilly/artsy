// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcY4Lt6xZEExcFHHJqtQ3Js50HV6vP7z8",
  authDomain: "artsy-3fd25.firebaseapp.com",
  projectId: "artsy-3fd25",
  storageBucket: "artsy-3fd25.appspot.com",
  messagingSenderId: "931540760980",
  appId: "1:931540760980:web:8518ffb39ec8a7b9da3781",
};
// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();

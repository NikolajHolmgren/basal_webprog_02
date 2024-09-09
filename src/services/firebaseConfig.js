// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuFQg0TeIm7HvI4P6uRAIPGbjMRGGRZMA",
    authDomain: "fbtest-caa99.firebaseapp.com",
    projectId: "fbtest-caa99",
    storageBucket: "fbtest-caa99.appspot.com",
    messagingSenderId: "653081721418",
    appId: "1:653081721418:web:4a55cd9c7a316b52c3c4b3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);  // Initialize Firestore and assign it to db

export { db };

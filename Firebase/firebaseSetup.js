// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAj9MS05Mc6SilFuB_2KMW27q4NdM1ams",
  authDomain: "xiong-5d4c4.firebaseapp.com",
  projectId: "xiong-5d4c4",
  storageBucket: "xiong-5d4c4.appspot.com",
  messagingSenderId: "989026982070",
  appId: "1:989026982070:web:38e977d756a96919eaae17",
  measurementId: "G-F4M6P931XJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
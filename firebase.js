// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp3epamWOHONFeINsmzznGe_ypcPSMyyA",
  authDomain: "edgar-mwila.firebaseapp.com",
  projectId: "edgar-mwila",
  storageBucket: "edgar-mwila.appspot.com",
  messagingSenderId: "552124755221",
  appId: "1:552124755221:web:e481fc958d59701efdcd1c",
  measurementId: "G-C4PHT1H53E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
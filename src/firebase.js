 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPagCA5YMt9k3hcts7mfdua2tqrLSAMu8",
  authDomain: "chess-experiment-23797.firebaseapp.com",
  projectId: "chess-experiment-23797",
  storageBucket: "chess-experiment-23797.appspot.com",
  messagingSenderId: "1050409862908",
  appId: "1:1050409862908:web:da6606a32325f4ea89f979"
};

// Initialize Firebaseç
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAhXPq5P16Fn98vhQzLQJAQpLspBM4twM",
  authDomain: "eventorganizer-bae82.firebaseapp.com",
  projectId: "eventorganizer-bae82",
  storageBucket: "eventorganizer-bae82.firebasestorage.app",
  messagingSenderId: "923785473582",
  appId: "1:923785473582:web:a6c58d90ca6ffad0bab9bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };

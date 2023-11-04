// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyBF1K2B-1zG8h_GMaLhbZmHxBb1QvERHVE",
  authDomain: "intelligence-753d4.firebaseapp.com",
  projectId: "intelligence-753d4",
  storageBucket: "intelligence-753d4.appspot.com",
  messagingSenderId: "932832582285",
  appId: "1:932832582285:web:199299ead3518fcb4ea0c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};
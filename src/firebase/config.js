// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhk65iYK9FpbvQyPGnkTu7kEpf_4x5vyY",
  authDomain: "twitter-3f820.firebaseapp.com",
  projectId: "twitter-3f820",
  storageBucket: "twitter-3f820.appspot.com",
  messagingSenderId: "272473641534",
  appId: "1:272473641534:web:07d6c2906c0b4a4f52f76f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
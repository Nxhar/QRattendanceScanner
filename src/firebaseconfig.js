import { initializeApp } from "firebase/app";
// import {  } from 'firebase/auth'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBnmpIzIg4JLyoDZdfORunkUs1600NkSMc",
  authDomain: "celeston-e7241.firebaseapp.com",
  projectId: "celeston-e7241",
  storageBucket: "celeston-e7241.appspot.com",
  messagingSenderId: "499539767284",
  appId: "1:499539767284:web:636a5665dd61e81465d3a1",
  measurementId: "G-9Z824KZQVK"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)

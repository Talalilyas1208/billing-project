import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtFQZDzTBwP5qRVgcC2ZGTD-yIEjsgEfg",
  authDomain: "recipet-texture.firebaseapp.com",
  projectId: "recipet-texture",
  storageBucket: "recipet-texture.firebasestorage.app",
  messagingSenderId: "749725618193",
  appId: "1:749725618193:web:cfceee84c0d63df2b721b0",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

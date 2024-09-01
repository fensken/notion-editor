// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEWs1aBz6V2KcSLMzGLmb9G8G3MHEovhs",
  authDomain: "notion-editor.firebaseapp.com",
  projectId: "notion-editor",
  storageBucket: "notion-editor.appspot.com",
  messagingSenderId: "666214121113",
  appId: "1:666214121113:web:ff7629990f28565f454208",
};

// Initialize Firebase
const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export { db };

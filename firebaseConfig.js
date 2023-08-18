// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, query, where, collection, addDoc, deleteDoc, getDocs, doc, setDoc, getDoc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsrSDFkyLKhk1n37iea5PkPJGWffNfimM",
  authDomain: "my-app-a295f.firebaseapp.com",
  projectId: "my-app-a295f",
  storageBucket: "my-app-a295f.appspot.com",
  messagingSenderId: "564448982029",
  appId: "1:564448982029:web:c1bcb43e1f480f101a9144"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize AUTH
const auth = getAuth();

const storage = getStorage(app);
const orderRef = collection(db, "order");


export {
    db,
    auth,
    storage,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    getFirestore, query, where, collection, addDoc, deleteDoc, getDocs, doc, setDoc, getDoc, onSnapshot, updateDoc,
    onAuthStateChanged, signOut,
    getStorage, ref, uploadBytes, getDownloadURL,
    orderRef,
  }




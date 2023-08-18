 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
  import { getFirestore, query, where, collection, addDoc, deleteDoc, getDocs, doc, setDoc, getDoc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD9emdPRZFVXVz7e6wXCUIgqDgGnVnYstg",
    authDomain: "hekatonplate.firebaseapp.com",
    projectId: "hekatonplate",
    storageBucket: "hekatonplate.appspot.com",
    messagingSenderId: "201217623322",
    appId: "1:201217623322:web:f188707e1f08133d3198a3"
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
  
  
  
  
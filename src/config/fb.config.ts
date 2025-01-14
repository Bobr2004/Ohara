import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//    apiKey: import.meta.env.OHARA_API_KEY,
//    authDomain: import.meta.env.OHARA_AUTH_DOMAIN,
//    projectId: import.meta.env.OHARA_PROJECT_ID,
//    storageBucket: import.meta.env.OHARA_STORAGE_BUCKET,
//    messagingSenderId: import.meta.env.OHARA_MESSAGING_SENDER_ID,
//    appId: import.meta.env.OHARA_APP_ID
// };

const firebaseConfig = {
   apiKey: "AIzaSyApMa2L7cL2b7AejTd2DuWWiMaC2OSwUko",
   authDomain: "ohara-88f08.firebaseapp.com",
   projectId: "ohara-88f08",
   storageBucket: "ohara-88f08.firebasestorage.app",
   messagingSenderId: "279661833864",
   appId: "1:279661833864:web:e2035bc71874bc7c03393d"
 };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

const auth = getAuth(app);

export { storage, db, auth };

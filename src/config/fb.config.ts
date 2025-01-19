import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   apiKey: import.meta.env.OHARA_API_KEY,
   authDomain: import.meta.env.OHARA_AUTH_DOMAIN,
   projectId: import.meta.env.OHARA_PROJECT_ID,
   storageBucket: import.meta.env.OHARA_STORAGE_BUCKET,
   messagingSenderId: import.meta.env.OHARA_MESSAGING_SENDER_ID,
   appId: import.meta.env.OHARA_APP_ID
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const db = getFirestore(app);

const auth = getAuth(app);

export { storage, db, auth };

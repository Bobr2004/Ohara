import { initializeApp } from "firebase/app";

const firebaseConfig = {
   apiKey: import.meta.env.OHARA_API_KEY,
   authDomain: import.meta.env.OHARA_AUTH_DOMAINT,
   projectId: import.meta.env.OHARA_PROJECT_ID,
   storageBucket: import.meta.env.OHARA_STORAGE_BUCKET,
   messagingSenderId: import.meta.env.OHARA_MESSAGING_SENDER_ID,
   appId: import.meta.env.OHARA_APP_ID
};

const app = initializeApp(firebaseConfig);

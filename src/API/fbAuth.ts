import {
   GoogleAuthProvider,
   signInWithPopup,
   signOut
} from "firebase/auth";
import { auth } from "../config/fb.config";




const googleProvider = new GoogleAuthProvider();

const fbSignInWithGoogle = async () => {
   await signInWithPopup(auth, googleProvider);
};

const fbSignOut = async () => {
   await signOut(auth);
};

export { fbSignInWithGoogle, fbSignOut };

import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../config/fb.config";

const googleProvider = new GoogleAuthProvider();

const fbSignInWithGoogle = async () => {
   await signInWithPopup(auth, googleProvider);
};

const fbSignOut = () => {
   console.log("yay?")
   signOut(auth).then((res) => console.log(res));
};

export { fbSignInWithGoogle, fbSignOut };

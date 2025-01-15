import {
   getAdditionalUserInfo,
   GoogleAuthProvider,
   signInWithPopup,
   signOut
} from "firebase/auth";
import { auth } from "../config/fb.config";
import { createUser } from "./fbDb";

const googleProvider = new GoogleAuthProvider();

const fbSignInWithGoogle = async () => {
   const result = await signInWithPopup(auth, googleProvider);
   const { isNewUser } = getAdditionalUserInfo(result) as any;
   if (isNewUser) {
      const displayName = result.user.displayName || "Username is not defined";
      const photoURL = result.user.photoURL || "";
      const email = result.user.email || "";
      createUser(result.user.uid, {
         displayName,
         email,
         photoURL,
         googlePhotoURL: photoURL
      });
   }
};

const fbSignOut = () => {
   signOut(auth).then((res) => console.log(res));
};

export { fbSignInWithGoogle, fbSignOut };

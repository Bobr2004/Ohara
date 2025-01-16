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
   try {
      const result = await signInWithPopup(auth, googleProvider);
      const { isNewUser } = getAdditionalUserInfo(result) as any;
      if (isNewUser) {
         const displayName =
            result.user.displayName || "Username is not defined";
         const photoURL = result.user.photoURL || "";
         const email = result.user.email || "";
         await createUser(result.user.uid, {
            displayName,
            email,
            photoURL,
            googlePhotoURL: photoURL
         });
      }
      return result.user.uid;
   } catch (err) {
      return "Error creating user";
   }
};

const fbSignOut = async () => {
   try {
      await signOut(auth);
   } catch (err) {
      return "Error signing out user";
   }
};

export { fbSignInWithGoogle, fbSignOut };

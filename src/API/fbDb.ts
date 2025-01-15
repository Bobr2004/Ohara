import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/fb.config";

type bookProgress = { bookId: string; page: number };

type userType = {
   displayName?: string;
   email?: string;
   photoURL?: string;
   googlePhotoURL?: string;
   progress?: bookProgress[];
};

const usersCollection = collection(db, "users");

const createUser = async ( id: string, userData: userType) => {
   try {
      await setDoc(doc(usersCollection, id), userData);
      return "oka";
   } catch (err) {
      console.log(err);
   }
};

// const updateUser = async ({ displayName, photoUrl }: userType, id: string) => {
//    try {
//       await setDoc(doc(usersCollection, id), {
//          displayName,
//          photoUrl
//       });
//       return "oka";
//    } catch (err) {
//       console.log(err);
//    }
// };

export { createUser };

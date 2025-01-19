import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore/lite";
import { db } from "../config/fb.config";

type bookProgress = { bookId: string; page: number };

type userDbType = {
   displayName?: string;
   email?: string;
   photoURL?: string;
   googlePhotoURL?: string;
   progress?: bookProgress[];
};

const usersCollection = collection(db, "users");

const createUser = async (id: string, userData: userDbType) => {
   try {
      await setDoc(doc(usersCollection, id), userData);
      return "200";
   } catch (err) {
      return "Error creating user";
   }
};

const getUser = async (id: string) => {
   try {
      const result = await getDoc(doc(usersCollection, id));
      return result.data();
   } catch (err) {
      return "Error getting user";
   }
};

const updateUser = async (id: string, userData: userDbType) => {
   try {
      await updateDoc(doc(usersCollection, id), userData);
      return "200";
   } catch (err) {
      return "Error updating user";
   }
};

export { createUser, updateUser, getUser };

export type { userDbType };

import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/fb.config";
import { userType } from "../store/userStore";

type userDbType = Omit<userType, "id">;

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

import { User } from "firebase/auth";
import { create } from "zustand";
import { fbSignOut } from "../API/fbAuth";

type userStoreType = {
   isLoggedIn: boolean;
   userName: string;
   photoUrl: string;
   email: string;
   logIn: (user: User) => void;
   signOut: () => void;
};

const useUserStore = create<userStoreType>((set) => ({
   isLoggedIn: false,
   userName: "",
   photoUrl: "",
   email: "",
   logIn: (user) =>
      set({
         isLoggedIn: true,
         userName: user.displayName || "",
         photoUrl: user.photoURL || "",
         email: user.email || ""
      }),
   signOut: () => {
      set({ isLoggedIn: false, userName: "", photoUrl: "", email: "" });
   }
}));

export { useUserStore };

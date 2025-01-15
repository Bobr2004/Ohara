import { User } from "firebase/auth";
import { create } from "zustand";

type userStoreType = {
   isLoggedIn: boolean;
   userName: string;
   photoUrl: string;
   email: string;
   logIn: (user: User) => void;
   signOut: () => void;

   layoutMode: "PWA" | "WEB" | null;
   setLayoutMode: (mode: "PWA" | "WEB" | null) => void;
   changeAvatar: (URL: string) => void;
};

const useUserStore = create<userStoreType>((set) => ({
   isLoggedIn: false,
   userName: "",
   photoUrl: "",
   email: "",
   layoutMode: null,
   logIn: (user) =>
      set({
         isLoggedIn: true,
         userName: user.displayName || "",
         photoUrl: user.photoURL || "",
         email: user.email || ""
      }),
   signOut: () => {
      set({ isLoggedIn: false, userName: "", photoUrl: "", email: "" });
   },
   setLayoutMode: (mode: "PWA" | "WEB" | null) => {
      set((usrData) => ({ ...usrData, layoutMode: mode }));
   },
   changeAvatar: (URL: string) => {
      set((usrData) => ({ ...usrData, photoUrl: URL }));
   }
}));

export { useUserStore };

import { create } from "zustand";
import { userDbType } from "../API/fbDb";

type userStoreType = {
   currentUserId: string;
   setCurrentUserId: (id: string) => void;

   currentUserData: userDbType;
   setCurrentUser: (user: userDbType) => void;
   clearCurrentUser: () => void;

   layoutMode: "PWA" | "WEB" | null;
   setLayoutMode: (mode: "PWA" | "WEB" | null) => void;
};

const questUser: userDbType = {
   displayName: "",
   email: "",
   photoURL: "",
   googlePhotoURL: ""
};

const useUserStore = create<userStoreType>((set) => ({
   // User
   currentUserId: localStorage.getItem("currentUserId") || "",
   setCurrentUserId: (id) =>
      set({
         currentUserId: id
      }),
   currentUserData: { ...questUser },
   setCurrentUser: (user) => {
      set({
         currentUserData: { ...user }
      });
   },
   clearCurrentUser: () => {
      set({ currentUserId: "", currentUserData: { ...questUser } });
      localStorage.removeItem("currentUserId");
   },
   // Layout
   layoutMode: null,
   setLayoutMode: (mode: "PWA" | "WEB" | null) => {
      set({ layoutMode: mode });
   }
}));

export { useUserStore };

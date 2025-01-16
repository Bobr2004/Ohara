import { create } from "zustand";
import { userDbType } from "../API/fbDb";

type userStoreType = {
   currentUserId: string;
   setCurrentUserId: (id: string) => void;

   currentUserState: "error" | "success" | "pending";
   setCurrentUserState: (state: "error" | "success" | "pending") => void;

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
   // User id
   currentUserId: localStorage.getItem("currentUserId") || "",
   setCurrentUserId: (id) =>
      set({
         currentUserId: id
      }),
   // User state
   currentUserState: "success",
   setCurrentUserState: (state) => set({ currentUserState: state }),

   // User data
   currentUserData: { ...questUser },
   setCurrentUser: (user) =>
      set({
         currentUserData: { ...user }
      }),
   clearCurrentUser: () => {
      set({ currentUserId: "", currentUserData: { ...questUser } });
   },
   // Layout
   layoutMode: null,
   setLayoutMode: (mode: "PWA" | "WEB" | null) => {
      set({ layoutMode: mode });
   }
}));

export { useUserStore };

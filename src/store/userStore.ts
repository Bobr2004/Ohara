import { create } from "zustand";

type bookProgress = { bookId: string; page: number };

type userType = {
   id?: string;
   displayName?: string;
   email?: string;
   photoURL?: string;
   googlePhotoURL?: string;
   progress?: bookProgress[];
};

type userStoreType = {
   isLoggedIn: boolean;
   currentUserData: userType;
   setCurrentUser: (user: userType) => void;
   clearCurrentUser: () => void;

   layoutMode: "PWA" | "WEB" | null;
   setLayoutMode: (mode: "PWA" | "WEB" | null) => void;
};

const questUser: userType = {
   id: "",
   displayName: "",
   email: "",
   photoURL: "",
   googlePhotoURL: "",
   progress: []
};

const useUserStore = create<userStoreType>((set) => ({
   // User
   isLoggedIn: false,
   currentUserData: { ...questUser },
   setCurrentUser: (user) => {
      set({
         isLoggedIn: true,
         currentUserData: { ...user }
      });
      if (user.id) localStorage.setItem("currentUserId", user.id);
   },
   clearCurrentUser: () => {
      set({ isLoggedIn: false, currentUserData: { ...questUser } });
      localStorage.removeItem("currentUserId");
   },
   // Layout
   layoutMode: null,
   setLayoutMode: (mode: "PWA" | "WEB" | null) => {
      set((data) => ({ ...data, layoutMode: mode }));
   },
   changeAvatar: (URL: string) => {
      set((data) => ({ ...data, photoUrl: URL }));
   }
}));

export { useUserStore };

export type { userType };

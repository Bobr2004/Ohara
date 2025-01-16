import { useEffect } from "react";
import { WebLayout } from "./WebLayout";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/fb.config";
import { userType, useUserStore } from "../store/userStore";
import { useLocation, useNavigate } from "react-router";
import { PwaLayout } from "./PwaLayout";
import { getUser } from "../API/fbDb";
import { useQuery } from "@tanstack/react-query";

function Layout() {
   const setLayoutMode = useUserStore((s) => s.setLayoutMode);
   const layoutMode = useUserStore((s) => s.layoutMode);
   const setCurrentUser = useUserStore((s) => s.setCurrentUser);

   // PWA check
   {
      function isMobilePWA() {
         const isPWA = window.matchMedia("(display-mode: standalone)").matches;
         const isMobile =
            /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
               navigator.userAgent
            );
         return isPWA && isMobile;
      }
      const location = useLocation();
      const navigate = useNavigate();
      useEffect(() => {
         if (isMobilePWA()) {
            setLayoutMode("PWA");
         } else {
            setLayoutMode("WEB");
         }
         navigate(location.pathname, { replace: true, state: null });
      }, []);
   }

   // Current user set
   useQuery({
      queryKey: ["currentUser"],
      queryFn: async () => {
         if (localStorage.getItem("currentUserId")) console.log("yay");
         
      }
   });

   // onAuthStateChanged(auth, (user) => {
   //    if (!user) return;
   //    (async () => {
   //       const result = (await getUser(user?.uid)) as userType;
   //       setCurrentUser({ id: user?.uid, ...result });
   //    })();
   // });

   if (layoutMode === "PWA") return <PwaLayout />;
   if (layoutMode === "WEB") return <WebLayout />;
   return <></>;
}

export { Layout };

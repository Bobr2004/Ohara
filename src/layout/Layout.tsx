import { useEffect } from "react";
import { WebLayout } from "./WebLayout";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/fb.config";
import { useUserStore } from "../store/userStore";
import { useLocation, useNavigate } from "react-router";
import { PwaLayout } from "./PwaLayout";

function Layout() {
   const setLayoutMode = useUserStore((store) => store.setLayoutMode);
   const layoutMode = useUserStore((store) => store.layoutMode);
   const logIn = useUserStore((store) => store.logIn);

   const location = useLocation();
   const navigate = useNavigate();

   function isMobilePWA() {
      const isPWA = window.matchMedia("(display-mode: standalone)").matches;
      const isMobile =
         /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
         );
      return isPWA && isMobile;
   }

   useEffect(() => {
      if (isMobilePWA()) {
         setLayoutMode("PWA");
      } else {
         setLayoutMode("WEB");
      }
      navigate(location.pathname, { replace: true, state: null });
   }, []);

   onAuthStateChanged(auth, (user) => {
      if (!user) return;
      logIn(user);
   });

   if (layoutMode === "PWA") return <PwaLayout />;
   if (layoutMode === "WEB") return <PwaLayout />;
   return <></>;
}


export { Layout};

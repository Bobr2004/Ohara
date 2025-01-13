import { useEffect, useState } from "react";
import { PwaLayout } from "./PwaLayout";
import { WebLayout } from "./WebLayout";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/fb.config";
import { useUserStore } from "../store/userStore";

function Layout() {
   const [layOutMode, setLayoutMode] = useState<"PWA" | "WEB" | null>(null);

   const logIn = useUserStore((store) => store.logIn);

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
   }, []);

   onAuthStateChanged(auth, (user) => {
      console.log("CHANGER");

      if (!user) return;
      logIn(user);
   });
   if (layOutMode === "PWA") return <PwaLayout />;
   if (layOutMode === "WEB") return <WebLayout />;
   return <></>;
}

export { Layout };

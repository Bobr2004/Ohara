import { useEffect } from "react";
import { WebLayout } from "./WebLayout";
import { useUserStore } from "../store/userStore";
import { useLocation, useNavigate } from "react-router";
import { PwaLayout } from "./PwaLayout";
import { getUser, userDbType } from "../API/fbDb";
import { useQuery } from "@tanstack/react-query";

function isMobilePWA() {
   const isPWA = window.matchMedia("(display-mode: standalone)").matches;
   const isMobile =
      /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
         navigator.userAgent
      );
   return isPWA && isMobile;
}

function Layout() {
   // CurrentUserId sync with LocalStorage
   const currentUserId = useUserStore((s) => s.currentUserId);
   useEffect(() => {
      localStorage.setItem("currentUserId", currentUserId);
   }, [currentUserId]);

   // Layout check
   const setLayoutMode = useUserStore((s) => s.setLayoutMode);
   const layoutMode = useUserStore((s) => s.layoutMode);
   useEffect(() => {
      setLayoutMode(isMobilePWA() ? "PWA" : "WEB");
   }, []);

   // Clear location state
   const location = useLocation();
   const navigate = useNavigate();
   useEffect(() => {
      if (location.state)
         navigate(location.pathname, { replace: true, state: null });
   }, []);

   // Current user set
   const setCurrentUserState = useUserStore((s) => s.setCurrentUserState);
   const setCurrentUser = useUserStore((s) => s.setCurrentUser);
   const { status } = useQuery({
      queryKey: ["currentUser"],
      queryFn: async () => {
         if (!currentUserId) return null;
         const userResult = (await getUser(currentUserId)) as userDbType;
         setCurrentUser(userResult);
         console.log(userResult);
         return null;
      }
   });

   useEffect(() => {
      setCurrentUserState(status);
   }, [status]);

   if (layoutMode === "PWA") return <PwaLayout />;
   if (layoutMode === "WEB") return <WebLayout />;
   return <></>;
}

export { Layout };

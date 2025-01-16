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
   const { isError, isFetching } = useQuery({
      queryKey: ["currentUser"],
      queryFn: async () => {
         if (!currentUserId) {
            console.log("ayayayaay");
            return null;
         }
         const userResult = (await getUser(currentUserId)) as userDbType;
         setCurrentUser(userResult);
         if (location.state) navigate(-1);
         return null;
      },
      gcTime: 0
   });

   useEffect(() => {
      if (isFetching) setCurrentUserState("pending");
      else if (isError) setCurrentUserState("error");
      else setCurrentUserState("success");
   }, [isFetching, isError]);

   if (layoutMode === "PWA") return <PwaLayout />;
   if (layoutMode === "WEB") return <WebLayout />;
   return <></>;
}

export { Layout };

import { NavLink, Outlet, useNavigate } from "react-router";
import { routes } from "../config/routes";

import { Popup } from "../components/Popup";
import { useEffect, useState } from "react";
import { useModal } from "../entry/ModalProvider";
import { ModalsEnum } from "../entry/ModalProvider";
import { useUserStore } from "../store/userStore";
import {
   LayoutBorderlessButton,
   LayoutIconButton,
   LayoutLinkIconButton,
   LayoutSearchBar
} from "./LayoutComponents";

function WebLayout() {
   const isLoggedIn = useUserStore((s) => s.isLoggedIn);
   const {photoURL, displayName} = useUserStore((s) => s.currentUserData);
   const openModal = useModal();
   const navigate = useNavigate();
   // custom states
   const [isPopupOpen, setIsPopupOpen] = useState<"" | "add" | "user">("");
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const hundleAddButton = () => {
      setIsPopupOpen((isPO) => (isPO === "add" ? "" : "add"));
   };

   const handleUserButton = () => {
      setIsPopupOpen((isPO) => (isPO === "user" ? "" : "user"));
   };

   useEffect(() => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      document
         .querySelector("#root")
         ?.addEventListener("click", ({ target }) => {
            const targt = target as HTMLElement;
            if (targt.closest(".popupResist")) return;
            else {
               setIsPopupOpen("");
            }
         });

      document.addEventListener("keydown", (event) => {
         const isCmdK = isMac && event.metaKey && event.key === "k";
         const isCtrlK = !isMac && event.ctrlKey && event.key === "k";
         if (isCmdK || isCtrlK) {
            navigate(routes.search, { state: { isSearchFocused: true } });
            document.getElementById("searchBar")?.focus();
         }
      });
   }, []);

   return (
      <>
         <header className=" border-b border-stone-200 p-3 lg:px-8">
            <nav className="flex justify-between items-center flex-wrap relative">
               <div className="flex justify-center sm:justify-start w-full sm:w-max  items-center gap-4">
                  <NavLink to={routes.home} className="text-xl sm:text-base">
                     Ohara
                  </NavLink>
                  <LayoutSearchBar className="hidden sm:flex" />
               </div>
               <div>
                  <LayoutIconButton
                     className="absolute -top-1 right-2 sm:hidden"
                     onClick={() => setIsMenuOpen((isO) => !isO)}
                  >
                     <i className="pi pi-bars"></i>
                  </LayoutIconButton>
               </div>
               <div
                  className={`w-full sm:!block sm:!w-auto sm:!h-auto sm:!overflow-visible navIconMenu ${
                     isMenuOpen ? "active" : ""
                  }`}
               >
                  <ul className="gap-2 flex justify-evenly sm:justify-start w-full sm:w-max relative sm:static mt-1 sm:mt-0">
                     <li>
                        <div className="sm:relative popupResist">
                           {/* ADD ICON */}
                           <LayoutIconButton
                              onClick={hundleAddButton}
                              className={
                                 isPopupOpen === "add"
                                    ? "border-stone-200 bg-stone-100"
                                    : ""
                              }
                           >
                              <span className="pi pi-plus-circle"></span>
                           </LayoutIconButton>
                           <Popup isOpen={isPopupOpen === "add"}>
                              <LayoutBorderlessButton
                                 onClick={() =>
                                    openModal({ modal: ModalsEnum.uploadPdf })
                                 }
                              >
                                 <>
                                    <span>Upload a pdf</span>
                                    <i className="pi pi-book"></i>
                                 </>
                              </LayoutBorderlessButton>
                              <LayoutBorderlessButton
                                 onClick={() =>
                                    openModal({
                                       modal: ModalsEnum.error,
                                       text: "This feature is still in development"
                                    })
                                 }
                              >
                                 <>
                                    <span>Upload an audio</span>
                                    <i className="pi pi-headphones"></i>
                                 </>
                              </LayoutBorderlessButton>
                           </Popup>
                        </div>
                     </li>
                     <li>
                        <LayoutLinkIconButton to={routes.saved}>
                           <span className="pi pi-arrow-circle-down"></span>
                        </LayoutLinkIconButton>
                     </li>
                     <li className="sm:hidden">
                        <LayoutLinkIconButton to={routes.search}>
                           <span className="pi pi-search"></span>
                        </LayoutLinkIconButton>
                     </li>
                     <li>
                        <div className="sm:relative popupResist">
                           {/* USER ICON */}
                           <LayoutIconButton
                              onClick={handleUserButton}
                              className={`${
                                 isLoggedIn ? "p-0 overflow-hidden sm:mx-1" : ""
                              } ${
                                 isPopupOpen === "user"
                                    ? "border-stone-200 bg-stone-100"
                                    : ""
                              }`}
                           >
                              {isLoggedIn ? (
                                 <img
                                    src={photoURL}
                                    className={`h-[34px] w-11 sm:h-7 sm:w-9 object-cover hover:brightness-[85%] ${
                                       isPopupOpen === "user"
                                          ? "brightness-[85%]"
                                          : ""
                                    }`}
                                 />
                              ) : (
                                 <span className="pi pi-user"></span>
                              )}
                           </LayoutIconButton>
                           <Popup isOpen={isPopupOpen === "user"}>
                              {displayName && (
                                 <p className="px-3 text-center">{displayName}</p>
                              )}
                              <LayoutLinkIconButton
                                 className="justify-between w-full"
                                 to={routes.settings}
                                 onClick={() => setIsPopupOpen("")}
                              >
                                 <>
                                    <p className="text-base">Settings</p>
                                    <i className="pi pi-cog"></i>
                                 </>
                              </LayoutLinkIconButton>
                              {isLoggedIn ? (
                                 <LayoutBorderlessButton
                                    onClick={() =>
                                       openModal({
                                          modal: ModalsEnum.signOut,
                                          text: "Are you sure you want to sign out?"
                                       })
                                    }
                                    className="justify-between w-full"
                                 >
                                    <>
                                       <span>Sign out</span>
                                       <i className="pi pi-sign-out text-xl"></i>
                                    </>
                                 </LayoutBorderlessButton>
                              ) : (
                                 <LayoutBorderlessButton
                                    onClick={() =>
                                       openModal({ modal: ModalsEnum.auth })
                                    }
                                    className="justify-between w-full"
                                 >
                                    <>
                                       <span>Log in</span>
                                       <i className="pi pi-sign-in"></i>
                                    </>
                                 </LayoutBorderlessButton>
                              )}
                           </Popup>
                        </div>
                     </li>
                  </ul>
               </div>
            </nav>
         </header>
         <main>
            <Outlet />
         </main>
      </>
   );
}

export { WebLayout };

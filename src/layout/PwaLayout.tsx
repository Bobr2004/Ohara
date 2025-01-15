import { NavLink, Outlet } from "react-router";
import { routes } from "../config/routes";
import { NavSearchBar } from "../components/SearchBar";
import {
   ButtonWithIcon,
   IconButton,
   NavIconButton
} from "../components/Buttons";
import { Popup } from "../components/Popup";
import { useEffect, useState } from "react";
import { useModal } from "../components/modals/ModalProvider";
import { useUserStore } from "../store/userStore";
import { ModalsEnum } from "../config/enums";

function PwaLayout() {
   const openModal = useModal();
   // custom states
   const [isPopupOpen, setIsPopupOpen] = useState<"" | "add" | "user">("");
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const { userName, isLoggedIn, photoUrl } = useUserStore((store) => store);

   const hundleAddButton = () => {
      setIsPopupOpen((isPO) => (isPO === "add" ? "" : "add"));
   };

   const handleUserButton = () => {
      setIsPopupOpen((isPO) => (isPO === "user" ? "" : "user"));
   };

   useEffect(() => {
      document
         .querySelector("#root")
         ?.addEventListener("click", ({ target }) => {
            const targt = target as HTMLElement;
            if (targt.closest(".popupResist")) return;
            else {
               setIsPopupOpen("");
            }
         });
   }, []);
   return (
      <>
         <main>
            <Outlet />
         </main>
         <header className="border-t border-stone-200 p-3 lg:px-8">
            <nav className="flex justify-between items-center flex-wrap relative">
               <div className={`w-full navIconMenu active`}>
                  <ul className="gap-2 flex justify-evenly w-full items-center relative">
                     <li>
                        <div className="sm:relative popupResist">
                           <IconButton
                              onClick={hundleAddButton}
                              isActive={isPopupOpen === "add"}
                           >
                              <span className="pi pi-plus-circle"></span>
                           </IconButton>
                           <Popup isOpen={isPopupOpen === "add"}>
                              <ButtonWithIcon
                                 className="justify-between w-full"
                                 text="Upload a pdf"
                                 onClick={() =>
                                    openModal({ modal: ModalsEnum.uploadPdf })
                                 }
                              >
                                 <i className="pi pi-book"></i>
                              </ButtonWithIcon>
                              <ButtonWithIcon
                                 className="justify-between w-full"
                                 text="Upload an audio"
                                 onClick={() =>
                                    openModal({
                                       modal: ModalsEnum.error,
                                       text: "This feature is still in development"
                                    })
                                 }
                              >
                                 <i className="pi pi-headphones"></i>
                              </ButtonWithIcon>
                           </Popup>
                        </div>
                     </li>
                     <li>
                        <NavIconButton to={routes.saved}>
                           <span className="pi pi-arrow-circle-down"></span>
                        </NavIconButton>
                     </li>
                     <li>
                        <NavIconButton to={routes.search}>
                           <span className="pi pi-search"></span>
                        </NavIconButton>
                     </li>
                     <li>
                        <div className="sm:relative popupResist">
                           <IconButton
                              onClick={handleUserButton}
                              isActive={isPopupOpen === "user"}
                              className={`${
                                 isLoggedIn ? "p-0 overflow-hidden" : ""
                              }`}
                           >
                              {isLoggedIn ? (
                                 <img
                                    src={photoUrl}
                                    className={`h-[34px] w-11 object-cover hover:brightness-[85%] ${
                                       isPopupOpen === "user"
                                          ? "brightness-[85%]"
                                          : ""
                                    }`}
                                 />
                              ) : (
                                 <span className="pi pi-user"></span>
                              )}
                           </IconButton>
                           <Popup isOpen={isPopupOpen === "user"}>
                              <NavIconButton
                                 className="justify-between w-full"
                                 to={routes.settings}
                                 onClick={() => setIsPopupOpen("")}
                              >
                                 <>
                                    <p className="text-base">Settings</p>
                                    <i className="pi pi-cog"></i>
                                 </>
                              </NavIconButton>
                              {isLoggedIn ? (
                                 <ButtonWithIcon
                                    text="Sign out"
                                    onClick={() =>
                                       openModal({
                                          modal: ModalsEnum.signOut,
                                          text: "Are you sure you want to sign out?"
                                       })
                                    }
                                    className="justify-between w-full"
                                 >
                                    <i className="pi pi-sign-out"></i>
                                 </ButtonWithIcon>
                              ) : (
                                 <ButtonWithIcon
                                    text="Log in"
                                    onClick={() =>
                                       openModal({ modal: ModalsEnum.auth })
                                    }
                                    className="justify-between w-full"
                                 >
                                    <i className="pi pi-sign-in"></i>
                                 </ButtonWithIcon>
                              )}
                              {userName && (
                                 <p className="px-3 text-center">{userName}</p>
                              )}
                           </Popup>
                        </div>
                     </li>
                  </ul>
               </div>
            </nav>
         </header>
      </>
   );
}

export { PwaLayout };

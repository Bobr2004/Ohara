import { NavLink, Outlet } from "react-router";
import { routes } from "../config/routes";
import {
   ButtonWithIcon,
   IconButton,
   NavIconButton
} from "../components/Buttons";
import { NavSearchBar } from "../components/SearchBar";
import { Popup } from "../components/Popup";
import { useEffect, useState } from "react";
import { useModal } from "../components/modals/ModalProvider";
import { ModalsEnum } from "../config/enums";
import { useUserStore } from "../store/userStore";

function WebLayout() {
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
         <header className=" border-b border-stone-200 p-3 lg:px-8">
            <nav className="flex justify-between items-center flex-wrap relative">
               <div className="flex justify-center sm:justify-start w-full sm:w-max  items-center gap-4">
                  <NavLink to={routes.home} className="text-xl sm:text-base">
                     Ohara
                  </NavLink>
                  <NavSearchBar className="hidden sm:flex" />
               </div>
               <div>
                  <IconButton
                     className="absolute -top-1 right-2 sm:hidden"
                     onClick={() => setIsMenuOpen((isO) => !isO)}
                  >
                     <i className="pi pi-bars"></i>
                  </IconButton>
               </div>
               <div
                  className={`w-full sm:!block sm:!w-auto sm:!h-auto sm:!overflow-visible navIconMenu ${
                     isMenuOpen ? "active" : ""
                  }`}
               >
                  <ul className="gap-2 flex justify-evenly sm:justify-start w-full sm:w-max relative sm:static mt-1 sm:mt-0">
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
                     <li className="sm:hidden">
                        <IconButton>
                           <span className="pi pi-search"></span>
                        </IconButton>
                     </li>
                     <li>
                        <div className="sm:relative popupResist">
                           <IconButton
                              onClick={handleUserButton}
                              isActive={isPopupOpen === "user"}
                              className={`${
                                 isLoggedIn ? "p-0 overflow-hidden mx-2" : ""
                              }`}
                           >
                              {isLoggedIn ? (
                                 <img
                                    src={photoUrl}
                                    className={`h-7 w-9 object-cover hover:brightness-[85%] ${
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
                              {userName && <p className="px-3">{userName}</p>}
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

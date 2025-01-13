import { NavLink, Outlet } from "react-router";
import { routes } from "../config/routes";
import {
   ButtonWithIcon,
   IconButton,
   NavIconButton
} from "../components/Buttons";
import { NavSearchBar } from "../components/SearchBar";
import { Popup } from "../components/Popup";
import { useState } from "react";
import { useModal } from "../components/modals/ModalProvider";
import { ModalsEnum } from "../config/enums";
import { useUserStore } from "../store/userStore";

function WebLayout() {
   const openModal = useModal();
   // custom states
   const [isPopupOpen, setIsPopupOpen] = useState<"" | "add" | "user">("");

   const { userName, isLoggedIn, photoUrl } = useUserStore((store) => store);

   const hundleAddButton = () => {
      setIsPopupOpen((isPO) => (isPO === "add" ? "" : "add"));
   };

   const handleUserButton = () => {
      setIsPopupOpen((isPO) => (isPO === "user" ? "" : "user"));
   };

   return (
      <>
         <header className=" border-b border-stone-200 p-3 lg:px-8">
            <nav className="flex gap-2 justify-between items-center">
               <div className="flex gap-4 items-center">
                  <NavLink to={routes.home}>Ohara</NavLink>
                  <NavSearchBar />
               </div>
               <ul className="flex gap-2">
                  <li>
                     <div className="relative">
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
                     <div className="relative">
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
                           <ButtonWithIcon
                              text="Settings"
                              className="justify-between w-full"
                           >
                              <i className="pi pi-cog"></i>
                           </ButtonWithIcon>
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
            </nav>
         </header>
         <main>
            <Outlet />
         </main>
      </>
   );
}

export { WebLayout };

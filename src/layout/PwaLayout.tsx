import { Outlet } from "react-router";
import { routes } from "../config/routes";
import { Popup } from "../components/Popup";
import { useEffect, useState } from "react";
import { useModal } from "../entry/ModalProvider";
import { useUserStore } from "../store/userStore";
import { ModalsEnum } from "../entry/ModalProvider";
import {
   LayoutBorderlessButton,
   LayoutIconButton,
   LayoutLinkIconButton
} from "./LayoutComponents";

function PwaLayout() {
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
                           <Popup isOpen={isPopupOpen === "add"} direction="up">
                              <LayoutBorderlessButton
                                 className="justify-between w-full"
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
                                 className="justify-between w-full"
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
                     <li>
                        <LayoutLinkIconButton to={routes.search}>
                           <span className="pi pi-search"></span>
                        </LayoutLinkIconButton>
                     </li>
                     <li>
                        <div className="sm:relative popupResist">
                           <LayoutIconButton
                              onClick={handleUserButton}
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
                           </LayoutIconButton>
                           <Popup
                              isOpen={isPopupOpen === "user"}
                              direction="up"
                           >
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
                                       <i className="pi pi-sign-out"></i>
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

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

function Layout() {
   const [isPopupOpen, setIsPopupOpen] = useState<"" | "add" | "user">("");

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
                           <ButtonWithIcon text="Upload a pdf">
                              <i className="pi pi-book"></i>
                           </ButtonWithIcon>
                           <ButtonWithIcon text="Upload an audio">
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
                        <IconButton onClick={handleUserButton} isActive={isPopupOpen === "user"}>
                           <span className="pi pi-user"></span>
                        </IconButton>
                        <Popup isOpen={isPopupOpen === "user"}>
                           <ButtonWithIcon text="Settings">
                              <i className="pi pi-cog"></i>
                           </ButtonWithIcon>
                           <ButtonWithIcon text="Sign out">
                              <i className="pi pi-sign-out"></i>
                           </ButtonWithIcon>
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

export { Layout };

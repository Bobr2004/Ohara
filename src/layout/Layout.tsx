import { NavLink, Outlet } from "react-router";
import { routes } from "../config/routes";
import { IconButton, NavIconButton } from "../components/IconButton";
import { NavSearchBar } from "../components/SearchBar";
import { useModalContext } from "../context/ModalContext";

function Layout() {
   const { openUploadModal, openSignInModal } = useModalContext();
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
                     <IconButton onClick={openUploadModal}>
                        <span className="pi pi-plus-circle"></span>
                     </IconButton>
                  </li>
                  <li>
                     <NavIconButton to={routes.saved}>
                        <span className="pi pi-arrow-circle-down"></span>
                     </NavIconButton>
                  </li>
                  <li>
                     <IconButton onClick={openSignInModal}>
                        <span className="pi pi-user"></span>
                     </IconButton>
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

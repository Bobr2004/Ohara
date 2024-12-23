import { NavLink, Outlet } from "react-router";
import { routes } from "../config/routes";

function Layout() {
   return (
      <>
         <header className=" border-b border-stone-200 p-4">
            <nav className="flex gap-2 justify-between items-center">
               <div className="flex gap-2 items-center">
                  <NavLink to={routes.home}>Ohara</NavLink>
                  <span className="pi pi-search"></span>
               </div>
               <ul className="flex gap-2">
                  <li>
                     <span className="pi pi-plus-circle"></span>
                  </li>
                  <li>
                     <span className="pi pi-arrow-circle-down"></span>
                  </li>
                  <li>
                     <span className="pi pi-user"></span>
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

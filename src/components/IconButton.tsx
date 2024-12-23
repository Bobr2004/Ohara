import { PropsWithChildren } from "react";
import { NavLink } from "react-router";

function IconButton({ children }: PropsWithChildren) {
   return (
      <button className="py-1 px-3 hover:bg-stone-200 rounded-lg transition-all text-xl flex items-center">
         {children}
      </button>
   );
}

function NavIconButton({ children, to }: PropsWithChildren & { to: string }) {
   return (
      <NavLink
         to={to}
         className="py-1 px-3 hover:bg-stone-200 rounded-lg transition-all text-xl flex items-center"
      >
         {children}
      </NavLink>
   );
}

export { IconButton, NavIconButton };

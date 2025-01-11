import { PropsWithChildren } from "react";
import { NavLink } from "react-router";

function IconButton({
   children,
   onClick
}: PropsWithChildren & { onClick: () => void }) {
   return (
      <button
         className="py-1 px-3 hover:bg-stone-100 rounded-lg transition-all text-xl flex items-center"
         onClick={onClick}
      >
         {children}
      </button>
   );
}

function NavIconButton({ children, to }: PropsWithChildren & { to: string }) {
   return (
      <NavLink
         to={to}
         className="py-1 px-3 hover:bg-stone-100 rounded-lg transition-all text-xl flex items-center"
      >
         {children}
      </NavLink>
   );
}

export { IconButton, NavIconButton };

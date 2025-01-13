import { PropsWithChildren } from "react";
import { NavLink } from "react-router";

type ButtonProps = {
   onClick?: () => void;
   text?: string;
   isActive?: boolean;
} & PropsWithChildren;

function IconButton({ children, onClick, isActive }: ButtonProps) {
   return (
      <button
         className={`${isActive ? "!border-stone-200 !bg-stone-100": ""} py-1 px-3 hover:bg-stone-100 hover:border-stone-200 border-white border rounded-lg transition-all text-xl flex items-center`}
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
         className="py-1 px-3 hover:bg-stone-200 hover:border-stone-200 border-white border rounded-lg transition-all text-xl flex items-center"
      >
         {children}
      </NavLink>
   );
}

function Button() {}

function ButtonWithIcon({ children, onClick, text }: ButtonProps) {
   return (
      <button
         className="py-1 px-3 hover:bg-stone-100 hover:border-stone-200 border-white border rounded-lg transition-all text-xl flex items-center justify-between gap-4 w-full"
         onClick={onClick}
      >
         {text && <p className="!text-base">{text}</p>}
         {children}
      </button>
   );
}

export { IconButton, NavIconButton, Button, ButtonWithIcon };

import { PropsWithChildren } from "react";
import { NavLink } from "react-router";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
   onClick?: () => void;
   text?: string;
   isActive?: boolean;
   className?: string;
} & PropsWithChildren;

function IconButton({ children, onClick, isActive }: ButtonProps) {
   return (
      <button
         className={`${
            isActive ? "!border-stone-200 !bg-stone-100" : ""
         } py-1 px-3 hover:bg-stone-100 hover:border-stone-200 border-white border rounded-lg transition-all text-xl flex items-center`}
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

function Button({ onClick, text, className }: ButtonProps) {
   return (
      <button
         className={twMerge(
            `py-1 px-5 hover:bg-stone-100 border-stone-200 border rounded-lg 
         transition-all flex items-center gap-4`,
            className
         )}
         onClick={onClick}
      >
         {text}
      </button>
   );
}

function ButtonWithIcon({ children, onClick, text, className }: ButtonProps) {
   return (
      <button
         className={twMerge(
            `py-1 px-3 hover:bg-stone-100 hover:border-stone-200 border-white border 
         rounded-lg transition-all text-xl flex items-center gap-4 `,
            className
         )}
         onClick={onClick}
      >
         {text && <p className="!text-base">{text}</p>}
         {children}
      </button>
   );
}

export { IconButton, NavIconButton, Button, ButtonWithIcon };

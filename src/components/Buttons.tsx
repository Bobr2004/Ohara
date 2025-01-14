import { PropsWithChildren } from "react";
import { NavLink } from "react-router";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
   onClick?: () => void;
   text?: string;
   isActive?: boolean;
   className?: string;
} & PropsWithChildren;

function IconButton({ children, onClick, isActive, className }: ButtonProps) {
   return (
      <button
         className={twMerge(
            `${
               isActive ? "!border-stone-200 !bg-stone-100" : ""
            } py-1 px-3 hover:bg-stone-100 hover:border-stone-200 border-white border rounded-lg transition-all text-2xl sm:text-xl flex items-center`,
            className
         )}
         onClick={onClick}
      >
         {children}
      </button>
   );
}

function NavIconButton({
   children,
   to,
   className,
   onClick
}: ButtonProps & { to: string }) {
   return (
      <NavLink
         {...{ to, onClick }}
         className={twMerge(
            `py-1 px-3 hover:bg-stone-100 hover:border-stone-200 border-white border rounded-lg 
            transition-all text-2xl sm:text-xl flex items-center gap-4`,
            className
         )}
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

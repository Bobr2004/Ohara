import { PropsWithChildren } from "react";
import { NavLink } from "react-router";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
   onClick?: () => void;
   className?: string;
} & PropsWithChildren;

// Main button (got a bigger fontsize for i elements)
function Button({ children, className, onClick }: ButtonProps) {
   return (
      <button
         className={twMerge(
            `py-1 px-5 bg-white hover:bg-stone-100 border-stone-200 border rounded-lg 
         flex items-center gap-4 [&>i]:text-xl`,
            className
         )}
         onClick={onClick}
      >
         {children}
      </button>
   );
}

type LinkButtonProps = ButtonProps & { to: string };

function LinkButton({ children, className, ...ButtonProps }: LinkButtonProps) {
   return (
      <NavLink
         {...ButtonProps}
         className={twMerge(
            `py-1 px-5 bg-white hover:bg-stone-100 border-stone-200 border rounded-lg 
         flex items-center gap-4 [&>i]:text-xl`,
            className
         )}
      >
         {children}
      </NavLink>
   );
}


// Color variants
function DangerButton({ children, className, ...ButtonProps }: ButtonProps) {
   return (
      <Button
         {...ButtonProps}
         className={twMerge(
            "text-white border-rose-700 bg-rose-500 hover:bg-rose-600 hover:border-rose-600",
            className
         )}
      >
         {children}
      </Button>
   );
}

function WarningButton({ children, className, ...ButtonProps }: ButtonProps) {
   return (
      <Button
         {...ButtonProps}
         className={twMerge(
            "text-white border-blue-700 bg-blue-500 hover:bg-blue-600 hover:border-blue-600",
            className
         )}
      >
         {children}
      </Button>
   );
}

export { Button, LinkButton, DangerButton, WarningButton };

export type { ButtonProps, LinkButtonProps };

import { twMerge } from "tailwind-merge";
import {
   Button,
   ButtonProps,
   LinkButton,
   LinkButtonProps
} from "../components/Buttons";
import { Link } from "react-router";
import { routes } from "../config/routes";

// Small
function LayoutIconButton({
   children,
   className,
   ...ButtonProps
}: ButtonProps) {
   return (
      <Button
         {...ButtonProps}
         className={twMerge(
            `px-3 text-2xl sm:text-xl border-white hover:border-stone-200`,
            className
         )}
      >
         {children}
      </Button>
   );
}

function LayoutLinkIconButton({
   children,
   className,
   ...ButtonProps
}: LinkButtonProps) {
   return (
      <LinkButton
         className={twMerge(
            `px-3 text-2xl sm:text-xl border-white hover:border-stone-200`,
            className
         )}
         {...ButtonProps}
      >
         {children}
      </LinkButton>
   );
}

function LayoutBorderlessButton({
   children,
   className,
   ...ButtonProps
}: ButtonProps) {
   return (
      <Button
         {...ButtonProps}
         className={twMerge(
            "px-3 justify-between border-white hover:border-stone-200",
            className
         )}
      >
         {children}
      </Button>
   );
}

function LayoutSearchBar({ className }: { className: string }) {
   return (
      <Link
         to={routes.search}
         className={twMerge(
            `flex gap-1 items-center text-sm opacity-60 hover:opacity-100`,
            className
         )}
      >
         <span className="pi pi-search"></span>
         <span>Search</span>
         <span className="border border-stone-200 py-1 px-2 rounded-lg">
            ⌘ + K
         </span>
      </Link>
   );
}
// Big

export {
   LayoutIconButton,
   LayoutLinkIconButton,
   LayoutBorderlessButton,
   LayoutSearchBar
};

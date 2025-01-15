import { twMerge } from "tailwind-merge";
import {
   Button,
   ButtonProps,
   LinkButton,
   LinkButtonProps
} from "../components/Buttons";


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
         className={twMerge("px-3 justify-between border-white hover:border-stone-200", className)}
      >
         {children}
      </Button>
   );
}
// Big

export { LayoutIconButton, LayoutLinkIconButton, LayoutBorderlessButton };

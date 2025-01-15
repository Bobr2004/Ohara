import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
type PopupProps = {
   isOpen: boolean;
   className?: string;
   direction?: "up" | "down";
} & PropsWithChildren;

function Popup({ isOpen, children, className, direction }: PopupProps) {
   direction ??= "down";
   return (
      <div
         className={twMerge(
            `flex flex-col gap-2 absolute z-10 left-0 sm:left-auto sm:right-0  w-full sm:w-max bg-white rounded-xl  border border-stone-200 p-2 ${
               isOpen ? "" : "hidden"
            } ${
               direction === "up"
                  ? "bottom-full -translate-y-1"
                  : "top-full translate-y-1"
            }`,
            className
         )}
      >
         {children}
      </div>
   );
}

export { Popup };

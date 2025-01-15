import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { useUserStore } from "../store/userStore";
type PopupProps = {
   isOpen: boolean;
   className?: string;
} & PropsWithChildren;

function Popup({ isOpen, children, className }: PopupProps) {
   const layoutMode = useUserStore((store) => store.layoutMode);
   const isPWA = layoutMode === "PWA";
   return (
      <div
         className={twMerge(
            `flex flex-col gap-2 absolute left-0 sm:left-auto sm:right-0  w-full sm:w-max bg-white rounded-xl  border border-stone-200 p-2 ${
               isOpen ? "" : "hidden"
            } ${isPWA ? "bottom-full -translate-y-1" : "top-full translate-y-1"}`,
            className
         )}
      >
         {children}
      </div>
   );
}

export { Popup };

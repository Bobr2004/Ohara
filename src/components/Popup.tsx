import { PropsWithChildren } from "react";
type PopupProps = {
   isOpen: boolean;
} & PropsWithChildren;

function Popup({ isOpen, children }: PopupProps) {
   return (
      <div
         className={`flex flex-col gap-2 absolute left-0 sm:right-0 translate-y-1 w-full sm:w-max bg-white rounded-xl  border border-stone-200 p-2 ${isOpen ? "": "hidden"}`}
      >
         {children}
      </div>
   );
}

export { Popup };

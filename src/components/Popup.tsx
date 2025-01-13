import { PropsWithChildren } from "react";
type PopupProps = {
   isOpen: boolean;
} & PropsWithChildren;

function Popup({ isOpen, children }: PopupProps) {
   return (
      <div
         className={`flex flex-col gap-2 absolute right-0 translate-y-1 w-max bg-white rounded-xl  border border-stone-200 p-2 ${isOpen ? "": "hidden"}`}
      >
         {children}
      </div>
   );
}

export { Popup };

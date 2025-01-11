import { PropsWithChildren, useEffect } from "react";
import { useModalContext } from "../../context/ModalContext";

function ModalLayout({ children }: PropsWithChildren) {
   return (
      <>
         <Overlay />
         <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[200px] h-[300px] bg-white rounded-lg border border-stone-200 p-4 shadow-lg">
               {children}
            </div>
         </div>
      </>
   );
}

function Overlay() {
   const { closeModal } = useModalContext();

   

   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === "Escape") closeModal();
      };

      document.addEventListener("keydown", handleKeyDown);

      const body = document.querySelector("body");
      if (body) body.style.overflow = "hidden";
      return () => {
         if (body) body.style.overflow = "auto";
         document.removeEventListener("keydown", handleKeyDown);
         (document.activeElement as HTMLElement).blur();
      };
   }, []);
   return (
      <div
         className="w-screen h-screen absolute inset-0 bg-black opacity-15"
         onClick={closeModal}
      ></div>
   );
}

export { ModalLayout };

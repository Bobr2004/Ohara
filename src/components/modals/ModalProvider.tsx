import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { IconButton } from "../Buttons";
import { UploadPdfModal } from "./UploadModal";
import { ErrorModal } from "./ErrorModal";
import { ModalsEnum } from "../../config/enums";
import { AuthModal, SignOutModal } from "./AuthModal";
import { AvatarsModal } from "./AvatarsModal";

function Overlay() {
   const navigate = useNavigate();

   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === "Escape") navigate(-1);
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
         className="fixed inset-0 w-screen h-screen bg-black opacity-15 popupResist"
         onClick={() => navigate(-1)}
      ></div>
   );
}

function ModalLayout({
   children,
   title
}: { title: string } & PropsWithChildren) {
   const navigate = useNavigate();
   return (
      <>
         <Overlay />
         <div className="fixed w-[calc(100%-2rem)] sm:w-[420px] p-3 bg-white border border-stone-200 rounded-xl top-[25%] left-1/2 -translate-x-1/2 space-y-3 popupResist">
            <div className="relative">
               <h2 className="text-center text-xl">{title}</h2>
               <div className="absolute top-0 right-0">
                  <IconButton onClick={() => navigate(-1)} className="!text-xl">
                     <i className="pi pi-times-circle"></i>
                  </IconButton>
               </div>
            </div>
            {children}
         </div>
      </>
   );
}

function ModalProvider() {
   const location = useLocation();
   const modal = location.state?.modal;
   if (!modal) return <></>;
   switch (modal) {
      case ModalsEnum.uploadPdf:
         return <UploadPdfModal />;
      case ModalsEnum.auth:
         return <AuthModal />;
      case ModalsEnum.avatars:
         return <AvatarsModal />;
      case ModalsEnum.error: {
         const text = location.state?.text;
         return <ErrorModal {...{ text }} />;
      }
      case ModalsEnum.signOut: {
         const text = location.state?.text;
         const fn = location.state?.fn;
         return <SignOutModal {...{ text, fn }} />;
      }
      default:
         return <></>;
   }
   // if (modal === ModalsEnum.uploadPdf) return <UploadPdfModal />;
   // // if (modal === ModalsEnum.uploadPdf) return <UploadPdfModal />;
   // if (modal === ModalsEnum.auth) return <AuthModal />;
   // if (modal === ModalsEnum.error) {
   //    const text = location.state?.text;
   //    return <ErrorModal {...{ text }} />;
   // }
   // return <></>;
}

type modalState = {
   modal: ModalsEnum;
   text?: string;
};

function useModal() {
   const location = useLocation();
   const navigate = useNavigate();
   const openModal = ({ modal, text }: modalState) => {
      navigate(location.pathname, { state: { modal, text } });
   };
   return openModal;
}

export { ModalProvider, ModalLayout, useModal };

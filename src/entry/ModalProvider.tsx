import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { UploadPdfModal } from "../components/modals/UploadPdfModal";
import { ErrorModal } from "../components/modals/ErrorModal";
import { AuthModal, SignOutModal } from "../components/modals/AuthModal";
import { UserEditModal } from "../components/modals/UserEditModal";
import { Button } from "../components/Buttons";
import { twMerge } from "tailwind-merge";

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
         className="fixed inset-0 w-screen h-screen bg-black opacity-15 popupResist z-20"
         onClick={() => navigate(-1)}
      ></div>
   );
}

type ModalLayoutProps = {
   title: string;
   className?: string;
} & PropsWithChildren;

function ModalLayout({
   children,
   className,
   title
}: { title: string } & ModalLayoutProps) {
   const navigate = useNavigate();
   return (
      <>
         <Overlay />
         <div
            className={twMerge(
               `top-[25%] fixed w-[calc(100%-2rem)] sm:w-[420px]  p-3 bg-white border border-stone-200 rounded-xl left-1/2 -translate-x-1/2 space-y-2 popupResist z-30`,
               className
            )}
         >
            <div className="relative">
               <h2 className="text-center text-xl">{title}</h2>
               <div className="absolute top-0 right-0">
                  <Button onClick={() => navigate(-1)} className="px-3">
                     <i className="pi pi-times-circle"></i>
                  </Button>
               </div>
            </div>
            {children}
         </div>
      </>
   );
}

enum ModalsEnum {
   uploadPdf = "uploadPdf",
   uploadAudio = "uploadAudio",
   auth = "auth",
   userEdit = "userEdit",
   signOut = "signOut",
   error = "error",
   confirm = "confirm"
}

type modalState = {
   modal: ModalsEnum;
   text?: string;
};

function ModalProvider() {
   const location = useLocation();
   const modal = location.state?.modal;
   const text = location.state?.text;

   if (!modal) return <></>;
   // User
   if (modal === ModalsEnum.auth) return <AuthModal />;
   if (modal === ModalsEnum.signOut) return <SignOutModal />;
   if (modal === ModalsEnum.userEdit) return <UserEditModal />;
   // Upload
   if (modal === ModalsEnum.uploadPdf) return <UploadPdfModal />;
   if (modal === ModalsEnum.error) return <ErrorModal {...{ text }} />;
}

function useModal() {
   const location = useLocation();
   const navigate = useNavigate();
   const openModal = ({ modal, text }: modalState) => {
      navigate(location.pathname, { state: { modal, text } });
   };
   return openModal;
}

export { ModalProvider, ModalLayout, useModal };

export { ModalsEnum };

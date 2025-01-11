import { createContext, PropsWithChildren, useContext, useState } from "react";
import { ModalLayout } from "../components/modals/ModalLayout";
import { useLocation, useNavigate } from "react-router";

type ModalContextType = {
   openUploadModal: () => void;
   openSignInModal: () => void;
   closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

function ModalContextProvider({ children }: PropsWithChildren) {
   const [modal, setModal] = useState<"Upload" | "SignIn" | null>(null);
   const navigate = useNavigate();
   const location = useLocation();

   const openUploadModal = () => {
      setModal("Upload");
      navigate(location.pathname, { state: { modal: "Upload" } });
   };

   console.log(location.state);

   const openSignInModal = () => {
      setModal("SignIn");
      navigate(location.pathname, { state: { modal: "SignIn" } });
   };

   const closeModal = () => {
      setModal(null);
      navigate(-1);
   };

   return (
      <ModalContext.Provider
         value={{ openUploadModal, openSignInModal, closeModal }}
      >
         {children}
         {modal === "Upload" && (
            <ModalLayout>
               <p>upload</p>
            </ModalLayout>
         )}
         {modal === "SignIn" && (
            <ModalLayout>
               <p>signIn</p>
            </ModalLayout>
         )}
      </ModalContext.Provider>
   );
}

const useModalContext = () => {
   const context = useContext(ModalContext);
   if (!context) {
      return "nigga" as unknown as ModalContextType;
      // return {
      //    openUploadModal: () => {},
      //    openSignInModal: () => {},
      //    closeModal: () => {}

      // };
   }
   return context;
};

export { ModalContextProvider, useModalContext };

import { fbSignInWithGoogle } from "../../API/fbAuth";
import { ButtonWithIcon } from "../Buttons";
import { ModalLayout } from "./ModalProvider";

function AuthModal() {
   return (
      <ModalLayout title="Log in into an account">
         {/* <p className="text-center">Options:</p> */}
         <div className="flex justify-center">
            <ButtonWithIcon
               onClick={fbSignInWithGoogle}
               text="Google"
               className="border-stone-200"
            >
               <i className="pi pi-google"></i>
            </ButtonWithIcon>
         </div>
      </ModalLayout>
   );
}

export { AuthModal };

import { useNavigate } from "react-router";
import { fbSignInWithGoogle, fbSignOut } from "../../API/fbAuth";
import { Button, ButtonWithIcon } from "../Buttons";
import { ModalLayout } from "./ModalProvider";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/fb.config";
import { useUserStore } from "../../store/userStore";

function AuthModal() {
   const navigate = useNavigate();
   onAuthStateChanged(auth, (user) => {
      if (!user) return;
      navigate(-1);
   });
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

function SignOutModal({ text }: { text: string }) {
   const signOut = useUserStore((store) => store.signOut);
   const navigate = useNavigate();
   onAuthStateChanged(auth, (user) => {
      if (user) return;
      navigate(-1);
      signOut();
   });

   return (
      <ModalLayout title="Confirmation">
         <p className="text-center">{text}</p>
         <div className="flex gap-4 justify-center w-full ">
            <Button text="Cancel" />
            <ButtonWithIcon
               text="Sign out"
               onClick={fbSignOut}
               className="border-rose-800 bg-rose-500 hover:bg-rose-600 hover:border-rose-600"
            >
               <i className="pi pi-sign-out"></i>
            </ButtonWithIcon>
         </div>
      </ModalLayout>
   );
}

export { AuthModal, SignOutModal };

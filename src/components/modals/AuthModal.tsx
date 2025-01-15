import { useNavigate } from "react-router";
import { fbSignInWithGoogle, fbSignOut } from "../../API/fbAuth";
import { Button, DangerButton } from "../Buttons";
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
            <Button onClick={fbSignInWithGoogle} className="border-stone-200">
               <>
                  <span>Google</span>
                  <i className="pi pi-google"></i>
               </>
            </Button>
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
            <Button onClick={() => navigate(-1)}>Cancel</Button>
            <DangerButton onClick={fbSignOut}>
               <>
                  <span>Sign out</span>
                  <i className="pi pi-sign-out"></i>
               </>
            </DangerButton>
         </div>
      </ModalLayout>
   );
}

export { AuthModal, SignOutModal };

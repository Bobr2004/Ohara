import { useNavigate } from "react-router";
import { fbSignInWithGoogle, fbSignOut } from "../../API/fbAuth";
import { Button, DangerButton } from "../Buttons";
import { ModalLayout } from "../../entry/ModalProvider";
import { useUserStore } from "../../store/userStore";
import { useQueryClient } from "@tanstack/react-query";

function AuthModal() {
   const setCurrentUserId = useUserStore((s) => s.setCurrentUserId);

   const queryClient = useQueryClient();

   const signInAccount = async () => {
      const userId = await fbSignInWithGoogle();
      setCurrentUserId(userId);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
   };

   return (
      <ModalLayout title="Log in into an account">
         {/* <p className="text-center">Options:</p> */}
         <div className="flex justify-center">
            <Button onClick={signInAccount} className="border-stone-200">
               <>
                  <span>Google</span>
                  <i className="pi pi-google"></i>
               </>
            </Button>
         </div>
      </ModalLayout>
   );
}

function SignOutModal() {
   const navigate = useNavigate();
   const clearCurrentUser = useUserStore((s) => s.clearCurrentUser);
   const queryClient = useQueryClient();

   const signOutAccount = async () => {
      await fbSignOut();
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      clearCurrentUser();
   };
   return (
      <ModalLayout title="Confirmation">
         <p className="text-center">Are you sure you want to sign out?</p>
         <div className="flex gap-4 justify-center w-full ">
            <Button onClick={() => navigate(-1)}>Cancel</Button>
            <DangerButton onClick={signOutAccount}>
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

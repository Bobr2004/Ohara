import { useNavigate } from "react-router";
import { fbSignInWithGoogle, fbSignOut } from "../../API/fbAuth";
import { Button, DangerButton } from "../Buttons";
import { ModalLayout } from "../../entry/ModalProvider";
import { useUserStore } from "../../store/userStore";
import { getUser, userDbType } from "../../API/fbDb";

function AuthModal() {
   const navigate = useNavigate();
   const setCurrentUser = useUserStore((s) => s.setCurrentUser);
   const setCurrentUserId = useUserStore((s) => s.setCurrentUserId);

   const signInAccount = async () => {
      const userId = await fbSignInWithGoogle();
      setCurrentUserId(userId);
      const userData = (await getUser(userId)) as userDbType;
      setCurrentUser(userData);
      navigate(-1);
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

   const signOutAccount = async () => {
      await fbSignOut();
      clearCurrentUser();
      navigate(-1);
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

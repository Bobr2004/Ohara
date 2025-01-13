import { useUserStore } from "../../store/userStore";
import { Button, ButtonWithIcon } from "../Buttons";
import { ModalLayout } from "./ModalProvider";

function ConfirmModal({ text }: { text: string }) {
   const isSignOut = text === "Are you sure you want to sign out?";
   const signOut = useUserStore((store) => store.signOut);
   return (
      <ModalLayout title="Confirmation">
         <p className="text-center">{text}</p>
         <div className="flex gap-4 justify-center w-full ">
            <Button text="Cancel" />
            {isSignOut ? (
               <ButtonWithIcon
                  text="Sign out"
                  onClick={signOut}
                  className="border-rose-800 bg-rose-500 hover:bg-rose-600 hover:border-rose-600"
               >
                  <i className="pi pi-sign-out"></i>
               </ButtonWithIcon>
            ) : (
               <ButtonWithIcon
                  text="Confirm"
                  className="border-amber-600 bg-amber-400 hover:bg-amber-500 hover:border-amber-500"
               >
                  <i className="pi pi-check"></i>
               </ButtonWithIcon>
            )}
         </div>
      </ModalLayout>
   );
}

export { ConfirmModal };

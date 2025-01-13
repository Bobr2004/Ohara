import { ModalLayout } from "./ModalProvider";

function AuthModal() {
   return (
      <ModalLayout title="Log in into an account">
         <div>Log in with Google</div>
      </ModalLayout>
   );
}

export { AuthModal };

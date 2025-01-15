import { ButtonWithIcon } from "../components/Buttons";
import { useModal } from "../components/modals/ModalProvider";
import { ModalsEnum } from "../config/enums";
import { useUserStore } from "../store/userStore";

function SettingsPage() {
   const { userName, email, photoUrl, isLoggedIn } = useUserStore(
      (store) => store
   );

   const openModal = useModal();
   return (
      <>
         <h1 className="font-montserrant text-2xl text-center my-4 font-semibold px-4">
            Settings
         </h1>
         <section className="mx-auto container px-4">
            <div className="border-y border-stone-200 py-2">
               {!isLoggedIn ? (
                  <>
                     <h2 className="text-center">Account info</h2>
                     <p className="text-center">You are not logged in</p>
                  </>
               ) : (
                  <ul className="flex justify-center sm:justify-start gap-4 relative flex-wrap">
                     <li className="order-2 sm:order-1">
                        <img
                           src={photoUrl}
                           className="h-20 w-20 object-cover"
                        />
                     </li>
                     <li className="order-3">
                        <h2>Account info</h2>
                        <p>{userName}</p> <p>{email}</p>
                     </li>
                     <li className="w-full sm:w-auto order-1 sm:order-4">
                        <ButtonWithIcon
                           text="Edit profile"
                           className="border-stone-200  ml-auto"
                           onClick={() =>
                              openModal({ modal: ModalsEnum.avatars })
                           }
                        >
                           <i className="pi pi-pencil"></i>
                        </ButtonWithIcon>
                     </li>
                  </ul>
               )}
            </div>
         </section>
         <section></section>
      </>
   );
}

export { SettingsPage };

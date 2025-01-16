import { Button } from "../components/Buttons";
import { useModal } from "../entry/ModalProvider";
import { ModalsEnum } from "../entry/ModalProvider";
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
                  <ul className="flex flex-col items-center sm:flex-row sm:justify-start gap-x-4 gap-y-2 relative flex-wrap">
                     <li className="sm:hidden">
                        <h2 className="text-center font-medium">
                           Account info
                        </h2>
                     </li>
                     <li>
                        <img
                           src={photoUrl}
                           className="h-20 w-20 object-cover"
                        />
                     </li>
                     <li>
                        <h2 className="text-center font-medium hidden sm:block">
                           Account info
                        </h2>
                        <p>{userName}</p>
                        <p>{email}</p>
                     </li>
                     <li>
                        <Button
                           onClick={() =>
                              openModal({ modal: ModalsEnum.userEdit })
                           }
                        >
                           <>
                              <span>Edit profile</span>

                              <i className="pi pi-user-edit"></i>
                           </>
                        </Button>
                     </li>
                  </ul>
               )}
            </div>
         </section>
      </>
   );
}

export { SettingsPage };

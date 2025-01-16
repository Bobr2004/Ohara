import { Button } from "../components/Buttons";
import { useModal } from "../entry/ModalProvider";
import { ModalsEnum } from "../entry/ModalProvider";
import { useUserStore } from "../store/userStore";

function SettingsPage() {
   const currentUserId = useUserStore((s) => s.currentUserId);
   const { displayName, email, photoURL } = useUserStore(
      (store) => store.currentUserData
   );

   const currentUserState = useUserStore((s) => s.currentUserState);
   const userState = {
      success: currentUserState === "success" && currentUserId,
      loading: currentUserState === "pending",
      unregistered: currentUserState === "success" && !currentUserId
   };
   
   const openModal = useModal();
   return (
      <>
         <h1 className="font-montserrant text-2xl text-center my-4 font-semibold px-4">
            Settings
         </h1>
         <section className="mx-auto container px-4">
            <div className="border-y border-stone-200 py-2">
               {userState.unregistered && (
                  <>
                     <h2 className="text-center">Account info</h2>
                     <p className="text-center">You are not logged in</p>
                  </>
               )}
               {userState.loading && (
                  <div className="text-center text-3xl w-full">
                     <i className="pi pi-cog pi-spin"></i>
                  </div>
               )}
               {userState.success && (
                  <ul className="flex flex-col items-center sm:items-start sm:flex-row sm:justify-start gap-x-4 gap-y-2 relative flex-wrap">
                     <li className="sm:hidden">
                        <h2 className="text-center font-medium">
                           Account info
                        </h2>
                     </li>
                     <li>
                        <img
                           src={photoURL}
                           className="h-20 w-20 object-cover"
                        />
                     </li>
                     <li>
                        <h2 className="text-center font-medium hidden sm:block">
                           Account info
                        </h2>
                        <p>{displayName}</p>
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

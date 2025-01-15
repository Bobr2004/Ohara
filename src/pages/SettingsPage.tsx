import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import { listAvatars } from "../API/fbStorage";

function SettingsPage() {
   const { userName, email, photoUrl, isLoggedIn } = useUserStore(
      (store) => store
   );

   const [avatarsURLS, setAvatarsURLS] = useState<string[]>([]);
   useEffect(() => {
      (async () => {
         setAvatarsURLS(await listAvatars());
      })();
   }, []);
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
                  <ul className="flex justify-center sm:justify-start gap-4">
                     <li>
                        <img
                           src={photoUrl}
                           className="h-20 w-20 object-cover"
                        />
                     </li>
                     <li className="">
                        <h2>Account info</h2>
                        <p>{userName}</p> <p>{email}</p>
                     </li>
                  </ul>
               )}
            </div>
         </section>
         <section>
            {avatarsURLS.map((avatarURL) => (
               <img
               src={avatarURL}
               className="h-20 w-20 object-cover"
            />
            ))}
         </section>
      </>
   );
}

export { SettingsPage };

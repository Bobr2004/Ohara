import { useUserStore } from "../store/userStore";

function SettingsPage() {
   const { userName, email, photoUrl } = useUserStore((store) => store);
   return (
      <>
         <h1 className="font-montserrant text-2xl text-center my-4 font-semibold px-4">
            Settings
         </h1>
         <section className="mx-auto container px-4">
            <div className="border-y border-stone-200 py-2">
               <ul className="flex justify-center sm:justify-start gap-4">
                  <li>
                     <img src={photoUrl} />
                  </li>
                  <li className="">
                     <h2>Account info</h2>
                     <p>{userName}</p> <p>{email}</p>
                  </li>
               </ul>
            </div>
         </section>
      </>
   );
}

export { SettingsPage };

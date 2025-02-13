import { useQuery } from "@tanstack/react-query";
import { ModalLayout } from "../../entry/ModalProvider";
import { listAvatars } from "../../API/fbStorage";
import { AvatarSelect } from "../AvatarSelect";
import { useUserStore } from "../../store/userStore";
import { WarningButton } from "../Buttons";
import { useState } from "react";
import { InputField } from "../InputField";

function UserEditModal() {
   const photoUrl = useUserStore((store) => store.photoUrl);
   const userName = useUserStore((store) => store.userName);
   const [userNameVal, setUserNameVal] = useState(userName);
   const { isPending, data, error } = useQuery({
      queryKey: ["avatars"],
      queryFn: listAvatars
   });
   return (
      <ModalLayout title="Edit Profile">
         <section className="flex gap-2">
            <div className="flex-shrink-0">
               <h4 className="flex gap-1 items-center w-min">Google</h4>
               <AvatarSelect src={photoUrl} />
            </div>
            <div className="flex-grow">
               <h4>Custom</h4>
               {isPending && (
                  <div className="text-center text-3xl w-full">
                     <i className="pi pi-cog pi-spin"></i>
                  </div>
               )}
               <ul className="flex gap-2 flex-wrap w-full flex-grow">
                  {data?.map((avatarURL, i) => (
                     <li key={i}>
                        <AvatarSelect src={avatarURL} />
                     </li>
                  ))}
               </ul>
            </div>
         </section>
         <InputField
            type="text"
            title="Username"
            value={userNameVal}
            onChange={({ target }) => setUserNameVal(target.value)}
         />
         <WarningButton className="mx-auto">Save changes</WarningButton>
      </ModalLayout>
   );
}

export { UserEditModal };

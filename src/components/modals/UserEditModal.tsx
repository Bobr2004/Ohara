import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ModalLayout } from "../../entry/ModalProvider";
import { listAvatars } from "../../API/fbStorage";
import { useUserStore } from "../../store/userStore";
import { Button, WarningButton } from "../Buttons";
import { useState } from "react";
import { InputField } from "../InputField";
import { updateUser } from "../../API/fbDb";

function UserEditModal() {
   const currentUserId = useUserStore((s) => s.currentUserId);
   const setCurrentUserState = useUserStore((s) => s.setCurrentUserState);
   const { photoURL, googlePhotoURL, displayName } = useUserStore(
      (store) => store.currentUserData
   );
   const [userNameVal, setUserNameVal] = useState(displayName);

   const [selectedPhotoUrl, setSelectedPhotoUrl] = useState(photoURL || "");

   const { isPending, data } = useQuery({
      queryKey: ["avatars"],
      queryFn: listAvatars,
      refetchOnMount: false
   });

   const queryClient = useQueryClient();

   const handleUpdateUser = async () => {
      setCurrentUserState("pending");
      await updateUser(currentUserId, {
         photoURL: selectedPhotoUrl,
         displayName: userNameVal
      });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
   };

   const currentUserState = useUserStore((s) => s.currentUserState);
   const userState = {
      success: currentUserState === "success" && currentUserId,
      loading: currentUserState === "pending",
      unregistered: currentUserState === "success" && !currentUserId
   };

   return (
      <ModalLayout title="Edit Profile">
         <section className="flex gap-2">
            <div className="flex-shrink-0">
               <h4 className="flex gap-1 items-center w-min">Google</h4>
               <AvatarSelect
                  src={googlePhotoURL || ""}
                  {...{ selectedPhotoUrl, setSelectedPhotoUrl }}
               />
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
                        <AvatarSelect
                           src={avatarURL}
                           {...{ selectedPhotoUrl, setSelectedPhotoUrl }}
                        />
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
         {userState.loading && (
            <Button className="mx-auto !border-white !bg-white">
               <>
                  <span>Loading</span>
                  <i className="pi pi-cog pi-spin"></i>
               </>
            </Button>
         )}
         {userState.success && (
            <WarningButton className="mx-auto" onClick={handleUpdateUser}>
               Save changes
            </WarningButton>
         )}
      </ModalLayout>
   );
}

type AvatarSelectProps = {
   src: string;
   selectedPhotoUrl: string;
   setSelectedPhotoUrl: (photoUrl: string) => void;
};

function AvatarSelect({
   src,
   selectedPhotoUrl,
   setSelectedPhotoUrl
}: AvatarSelectProps) {
   return (
      <div
         className={`p-1 border border-stone-200 rounded-lg hover:bg-stone-100 hover:border-stone-300 cursor-pointer ${
            selectedPhotoUrl === src
               ? "bg-stone-100 border-stone-300 [&>img]:brightness-[85%]"
               : ""
         }`}
         onClick={() => setSelectedPhotoUrl(src)}
      >
         <img src={src} className="h-20 w-20 object-cover rounded-md" />
      </div>
   );
}

export { UserEditModal };

import { useUserStore } from "../store/userStore";

type AvatarSelectProps = {
   src: string;
};

function AvatarSelect({ src }: AvatarSelectProps) {
   const photoUrl = useUserStore((store) => store.photoUrl);
   const changeAvatar = useUserStore((store) => store.changeAvatar);
   const setAvatar = () => {
      changeAvatar(src);
   };
   return (
      <div
         className={`p-1 border border-stone-200 rounded-lg hover:bg-stone-100 hover:border-stone-300 cursor-pointer ${
            photoUrl === src
               ? "bg-stone-100 border-stone-300 [&>img]:brightness-[85%]"
               : ""
         }`}
         onClick={setAvatar}
      >
         <img src={src} className="h-20 w-20 object-cover rounded-md" />
      </div>
   );
}

export { AvatarSelect };

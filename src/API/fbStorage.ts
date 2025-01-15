import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../config/fb.config";

const avatarsRef = ref(storage, "avatars");

const listAvatars = async () => {
   const { items } = await listAll(avatarsRef);
   const refs = await Promise.all(
      items.map(async (item) => await getDownloadURL(item))
   );
   return refs;
};

export { listAvatars };

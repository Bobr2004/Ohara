import { userDbType } from "../API/fbDb";

const globalCache = "oharaCache";
const userCache = "oharaUserCache";

const saveInCache = async (userData: userDbType) => {
   const cache = await caches.open(userCache);
   await cache.put("userData", new Response(JSON.stringify(userData)));
};

export { globalCache, saveInCache };

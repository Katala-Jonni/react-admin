import { Storage, storageKey } from "../storage";

export default function authHeader() {
  const storage = Storage.getStorage(storageKey.authKey);
  if (storage && storage.userInfo && storage.placeInfo && storage.goodsId) {
    // for Node.js Express back-end
    return {
      "x-access-token": `${storage.userInfo}.${storage.placeInfo}.${storage.goodsId}`,
      "Content-Type": "application/json;charset=utf-8"
    };
  } else {
    return {};
  }
}

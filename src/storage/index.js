export class Storage {
  static setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getStorage(key) {
    try {
      if (key) {
        const storage = localStorage.getItem(key);
        if (storage) {
          return JSON.parse(storage);
        }
      }
    } catch (e) {
      return null;
    }
  }

  static removeStorage(key) {
    localStorage.removeItem(key);
  }
}

export const storageKey = {
  authKey: "salon.admin.frontendInfo"
};

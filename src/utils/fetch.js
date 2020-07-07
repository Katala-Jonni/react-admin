import authHeader from "./services";
import { Storage, storageKey } from "../storage";

let headers = {
  "Content-Type": "application/json;charset=utf-8"
};

export class Fetch {
  static get(url) {
    try {
      return (async () => {
        const res = await fetch(url, { headers: authHeader() });
        return await res.json();
      });
    } catch (e) {
      console.log(e);
    }

  }

  static post(url, body) {
    return (async () => {
      const { login, password } = body;
      const res = await fetch(url, {
        method: "POST",
        headers: login && password ? headers : authHeader(),
        body: JSON.stringify(body)
      });
      return await res.json();
    });
  }

  static put(url, body) {
    return (async () => {
      const res = await fetch(url, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(body)
      });
      return await res.json();
    });
  }

  static delete(url, body) {
    return (async () => {
      console.log(url);
      const res = await fetch(url, {
        method: "DELETE",
        headers: authHeader()
        // body: JSON.stringify(body)
      });
      return await res.json();
    });
  }
};

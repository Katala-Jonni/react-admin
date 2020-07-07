import { fork, takeLatest, put, call } from "redux-saga/effects";
import api from "../../utils/api.js";
import { endApp, startApp, getLoginStart, getLoginEnd, setErrorMessage, startAuth, endAuth } from "./actions";
import { Storage, storageKey } from "../../storage";
import authHeader from "../../utils/services";
import { Fetch } from "../../utils/fetch";

const { baseUrl, login, auth } = api;

const fetchDay = async () => {
  // try {
  //   const { baseUrl } = api;
  //   const res = await fetch(baseUrl);
  //   return await res.json();
  // } catch (e) {
  //   // console.log(e);
  //   return {
  //     day: false,
  //     error: true
  //   };
  // }
  // console.log("test");
  return new Promise((resolve, reject) => {
    let timer = null;
    timer = setTimeout(async () => {
      try {
        const { baseUrl } = api;
        const res = await fetch(baseUrl);
        clearInterval(timer);
        const parse = await res.json();
        resolve(parse);
      } catch (e) {
        console.log(e);
        reject(
          {
            day: false,
            error: true
          }
        );
      }
    }, 3000);
  });
};

const fetchLogin = async (body) => {
  const { baseUrl, login, auth } = api;
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(body)
  });
  return await res.json();
};

const fetchAuth = async (body) => {
  const { baseUrl, login, auth } = api;
  const res = await fetch(`${baseUrl}/auth/login`, { headers: authHeader() });
  return await res.json();
};

function* startApplication(action) {
  // const { payload } = action;
  // if (!payload && !payload.place) {
  //   return console.log("@@App/saga/startApplication");
  // }
  const { baseUrl } = api;
  const storage = Storage.getStorage(storageKey.authKey);
  if (!storage && !storage.id && !storage.roles && !storage.accessToken && !storage.userInfo && !storage.placeInfo && !storage.goodsId) {
    return yield put({ day: false, error: true, administrators: null });
  }
  const { day, error, administrators } = yield call(Fetch.get(`${baseUrl}/${storage.id}`));
  return yield put(endApp({ day, error, administrators }));
};

function* startLoginAuth(action) {
  const { payload } = action;
  // const res = yield call(fetchLogin, payload);
  const { baseUrl, login, auth } = api;
  const res = yield call(Fetch.post(`${baseUrl}${auth}${login}`, payload));
  if (res.message) {
    Storage.removeStorage(storageKey.authKey);
    return yield put(setErrorMessage({ errorMessage: res.message }));
  }
  const { id, roles, accessToken, userInfo, placeInfo, goodsId } = res;
  if (id && Array.isArray(roles) && accessToken) {
    Storage.setStorage(storageKey.authKey, res);
    return yield put(getLoginEnd({ place: id, roles }));
  }
};

function* startAuthApp(action) {
  // const res = yield call(fetchAuth);
  // const res = await fetch(`${baseUrl}/auth/login`, { headers: authHeader() });
  const res = yield call(Fetch.get(`${baseUrl}${auth}${login}`));
  console.log(res);
  if (res && res.message) {
    return yield put(endAuth({
      place: null,
      roles: null
    }));
  }
  if (res && res.status) {
    const storage = Storage.getStorage(storageKey.authKey);
    if (!storage && !storage.id && !storage.roles && !storage.accessToken && !storage.userInfo && !storage.placeInfo && !storage.goodsId) {
      return yield put(endAuth({
        place: null,
        roles: null
      }));
    }
    return yield put(endAuth({
      place: storage.id,
      roles: storage.roles
    }));
  }
};

function* adminWatcher() {
  yield takeLatest(startApp, startApplication);
  yield takeLatest(getLoginStart, startLoginAuth);
  yield takeLatest(startAuth, startAuthApp);
  // console.log(res);
  // yield takeLatest(loadTill, loadTillData);
}

export default function* () {
  yield fork(adminWatcher);
  // console.log("Admin saga run");
}

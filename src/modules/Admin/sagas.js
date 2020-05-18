import { fork, takeLatest, put, call } from "redux-saga/effects";
import api from "../../utils/api.js";
import { endApp, startApp, errorApp } from "./actions";
import { loadTill } from "../Till/actions";

import fetchOnline from "react-native-fetch-polyfill";


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

function* startApplication() {
  const { day, error } = yield call(fetchDay);
  return yield put(endApp({ day, error }));
};

function* adminWatcher() {
  yield takeLatest(startApp, startApplication);
  // console.log(res);
  // yield takeLatest(loadTill, loadTillData);
}

export default function* () {
  yield fork(adminWatcher);
  // console.log("Admin saga run");
}

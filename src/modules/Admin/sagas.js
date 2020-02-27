import { fork, takeLatest, put, call } from "redux-saga/effects";
import api from "../../utils/api.js";
import { startApp } from "./actions";

const fetchDay = async () => {
  const { baseUrl } = api;
  const res = await fetch(baseUrl);
  return await res.json();
};

function* adminWatcher() {
  const { day } = yield call(fetchDay);
  return yield put(startApp(day));
  // console.log(res);
  // yield takeLatest(loadTill, loadTillData);
}

export default function* () {
  yield fork(adminWatcher);
  // console.log("Admin saga run");
}

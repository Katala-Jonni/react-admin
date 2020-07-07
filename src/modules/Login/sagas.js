import { fork, takeLatest, put, call } from "redux-saga/effects";
import api from "../../utils/api.js";
import { getLoginStart, getLoginEnd } from "./actions";

const fetchLogin = async (body) => {
  const { baseUrl, login } = api;
  const res = await fetch(`${baseUrl}${login}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(body)
  });
  return await res.json();
};

function* startLoginAuth(action) {
  console.log(action);
  const { payload } = action;
  const res = yield call(fetchLogin, payload);
  return yield put(getLoginEnd, res);
};

function* loginWatcher() {
  yield takeLatest(getLoginStart, startLoginAuth);
}

export default function* () {
  yield fork(loginWatcher);
  console.log("Login saga run");
}

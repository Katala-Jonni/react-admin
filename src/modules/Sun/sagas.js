import { fork, takeLatest, put, call } from "redux-saga/effects";

function* sunWatcher() {
  // yield takeLatest(loadTill, loadTillData);
}

export default function* () {
  yield fork(sunWatcher);
  console.log("Sun saga run");
}

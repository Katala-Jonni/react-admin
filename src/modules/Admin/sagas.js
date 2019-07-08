import { fork, takeLatest, put, call } from "redux-saga/effects";

function* tillWatcher() {
  // yield takeLatest(loadTill, loadTillData);
}

export default function* () {
  yield fork(tillWatcher);
  console.log("Admin saga run");
}

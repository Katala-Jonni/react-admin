import { fork, takeLatest, put, call } from "redux-saga/effects";

function* tillWatcher() {
  // yield takeLatest(startSendCart, sendCart);
}

export default function* () {
  yield fork(tillWatcher);
  console.log("Till saga run");
}

import { fork } from "redux-saga/effects";
import { sagas as calendarSagas } from "./Calendar";
import { sagas as shopSagas } from "./Shop";

export default function* rootSaga() {
  yield fork(calendarSagas);
  yield fork(shopSagas);
}

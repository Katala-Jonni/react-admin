import { fork } from "redux-saga/effects";
import { sagas as calendarSagas } from "./Calendar";
import { sagas as shopSagas } from "./Shop";
import { sagas as tillSagas } from "./Till";
import { sagas as AdminSagas } from "./Admin";

export default function* rootSaga() {
  yield fork(AdminSagas);
  yield fork(calendarSagas);
  yield fork(shopSagas);
  yield fork(tillSagas);
}

import { fork } from "redux-saga/effects";
import { sagas as calendarSagas } from "./Calendar";
import { sagas as shopSagas } from "./Shop";
import { sagas as tillSagas } from "./Till";
import { sagas as adminSagas } from "./Admin";
import { sagas as sunSagas } from "./Sun";
import { sagas as certificateSagas } from "./Certificate";
import { sagas as mixedPaySagas } from "./MixedPay";

export default function* rootSaga() {
  yield fork(adminSagas);
  yield fork(calendarSagas);
  yield fork(shopSagas);
  yield fork(tillSagas);
  yield fork(sunSagas);
  yield fork(certificateSagas);
  yield fork(mixedPaySagas);
}

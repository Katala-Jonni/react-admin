import { fork } from 'redux-saga/effects';
import { sagas as calendarSagas } from './Calendar';

export default function* rootSaga() {
  yield fork(calendarSagas);
}

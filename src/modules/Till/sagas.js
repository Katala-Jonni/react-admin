import { fork, takeLatest, put, call } from "redux-saga/effects";
import { changeTill, loadTill, addInTill, changeInTill, changeOutTill } from "./actions";
import moment from "moment/min/moment-with-locales";
import { addOutTill } from "./index";

moment.locale("ru");

const inTill = [];
const outTill = [];

const fetchData = () =>
  new Promise(resolve => {
    setTimeout(() => resolve({
      inTill,
      outTill
    }), 1000);
  })
    .then(res => res);

function* loadTillData() {
  const loadData = yield call(fetchData);
  yield put(changeTill(loadData));
}

function* addInTillData({ payload }) {
  const newInTill = {
    count: payload.count,
    time: moment().format("DD.MM.YY, LTS")
  };
  yield put(changeInTill(newInTill));
}

function* addInOutTillData({ payload }) {
  const newOutTill = {
    title: payload.title,
    count: payload.count,
    time: moment().format("LTS")
  };
  yield put(changeOutTill(newOutTill));
}

function* tillWatcher() {
  yield takeLatest(loadTill, loadTillData);
  yield takeLatest(addInTill, addInTillData);
  yield takeLatest(addOutTill, addInOutTillData);
}

export default function* () {
  yield fork(tillWatcher);
  console.log("Till saga run");
}

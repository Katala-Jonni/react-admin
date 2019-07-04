import { fork, takeLatest, put, call } from "redux-saga/effects";
import {
  changeTill,
  loadTill,
  addInTill,
  changeInTill,
  changeOutTill,
  loadInfoTill,
  endLoadInfoTill
} from "./actions";
import moment from "moment/min/moment-with-locales";
import { addOutTill } from "./index";

moment.locale("ru");

const inTill = [];
const outTill = [];
let inTillSum = 1000;
let outTillSum = 100;
let cash = 0;
let paymentByCard = 0;
let revenue = 0;
let income = 0;

const fetchData = () =>
  new Promise(resolve => {
    cash = revenue + inTillSum - (revenue - income) - outTillSum - paymentByCard;
    setTimeout(() => resolve({
      inTill,
      outTill,
      inTillSum,
      outTillSum,
      cash,
      paymentByCard,
      revenue,
      income
    }), 1000);
  })
    .then(res => res);

const fetchLoadData = () =>
  new Promise(resolve => {
    setTimeout(() => resolve({
      inTillSum,
      outTillSum
    }), 1000);
  })
    .then(res => res);

const addInTillFetch = data =>
  new Promise(resolve => {
    inTill.push(data);
    resolve(inTill);
  })
    .then(res => res);

const addOutTillFetch = data =>
  new Promise(resolve => {
    outTill.push(data);
    resolve(outTill);
  })
    .then(res => res);

const getAmount = array => {
  let amount = 0;
  array.forEach((a) => amount += a.count);
  return amount;
};
// решить пробему с загрузкой
// нужно отправлять данные моковые типо на сервер и получать их оттуда
function* loadTillData() {
  let loadData = yield call(fetchData);
  // const keys = Object.keys(loadData);
  // const counts = keys.reduce((start, item) => {
  //   start[`${item}Sum`] = getAmount(loadData[item]);
  //   return start;
  // }, {});
  // const { inTillSum, outTillSum } = counts;
  // const cash = inTillSum - outTillSum;
  // loadData = { ...loadData, ...counts, cash };
  yield put(changeTill(loadData));
}

function* addInTillData({ payload }) {
  const newInTill = {
    count: payload.count,
    time: moment().format("DD.MM.YY, LTS")
  };
  const loadData = yield call(addInTillFetch, newInTill);
  yield put(changeInTill(loadData));
  const inTillSum = getAmount(loadData);
  yield put(endLoadInfoTill({ inTillSum }));
}

function* addInOutTillData({ payload }) {
  const newOutTill = {
    title: payload.title,
    count: payload.count,
    time: moment().format("LTS")
  };
  const loadData = yield call(addOutTillFetch, newOutTill);
  yield put(changeOutTill(loadData));
  const outTillSum = getAmount(loadData);
  yield put(endLoadInfoTill({ outTillSum }));
}

function* loadInfoTillData({ payload }) {
  console.log(payload);
  const keys = Object.keys(payload);
  let infoDay = {
    revenue: 0,
    income: 0
  };
  if (keys) {
    keys.forEach((name) => {
      payload[name].forEach(item => {
        infoDay.revenue += item.totalCount;
        infoDay.income += item.outMaster;
      });
    });
  }
  yield put(endLoadInfoTill(infoDay));
}

function* loadTillDataInfo({ payload }) {
  const data = yield call(fetchData);
  const { totalDay } = payload;
  const keys = Object.keys(totalDay);
  let infoDay = {
    revenue: 0,
    income: 0,
    paymentByCard: 0
  };
  if (keys) {
    keys.forEach((name) => {
      totalDay[name].forEach(item => {
        infoDay.revenue += item.totalCount;
        infoDay.income += item.outMaster;
        infoDay.paymentByCard += item.payment === "card" ? item.totalCount : 0;
      });
    });
  }
  yield put(endLoadInfoTill(infoDay));
  // yield put(endLoadInfoTill(data));
}

function* tillWatcher() {
  yield takeLatest(loadTill, loadTillData);
  yield takeLatest(loadInfoTill, loadTillDataInfo);
  yield takeLatest(addInTill, addInTillData);
  yield takeLatest(addOutTill, addInOutTillData);
  // yield takeLatest(loadInfoTill, loadInfoTillData);
}

export default function* () {
  yield fork(tillWatcher);
  console.log("Till saga run");
}

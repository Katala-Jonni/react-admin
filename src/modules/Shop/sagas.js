import { fork, takeLatest, put, call } from "redux-saga/effects";
import { startSendCart, endSendCart, loadTotalDay, endTotalDay, startRemoveDay } from "./actions";
import moment from "moment/min/moment-with-locales";
import currentTill from "./currentTill";
import days from "./totalDay";
import { loadApp } from "../Admin";
import { endLockOpen } from "../Till/actions";
import { lockClose, lockOpen, clearTillInfo } from "../Till";

const fetchDataDay = info => {
  const {
    date,
    inTill,
    outTill,
    paymentByCard,
    revenue,
    income,
    totalDay,
    totalOrders,
    cash
  } = info;
  if (days[date]) {
    // days[date] = { ...days[date], ...rest };
    const day = days[date];

    // cash
    if (day.cash) {
      day.cash = day.cash.concat(cash);
    } else {
      day.cash = [cash];
    }
    // income
    if (day.income) {
      day.income = day.income.concat(income);
    } else {
      day.income = [income];
    }
    // revenue
    if (day.revenue) {
      day.revenue = day.revenue.concat(revenue);
    } else {
      day.revenue = [revenue];
    }
    // paymentByCard
    if (day.paymentByCard) {
      day.paymentByCard = day.paymentByCard.concat(paymentByCard);
    } else {
      day.paymentByCard = [paymentByCard];
    }
    // totalOrders
    if (day.totalOrders) {
      const keys = Object.keys(totalOrders);
      const orders = keys.map(key => totalOrders[key]);
      day.totalOrders = [...day.totalOrders, ...orders];
    } else {
      day.totalOrders = [totalOrders];
    }
    // totalDay
    if (day.members) {
      const keys = Object.keys(totalDay);
      keys.forEach(key => {
        if (day.members[key]) {
          day.members[key] = [...day.members[key], ...totalDay[key]];
        } else {
          day.members[key] = [...totalDay[key]];
        }
      });
    } else {
      day.members = totalDay || {};
    }
    // inTill
    if (day.inTill) {
      day.inTill = [...day.inTill, ...inTill];
    } else {
      day.inTill = [...inTill] || [];
    }
    // outTill
    if (day.outTill) {
      day.outTill = [...day.outTill, ...outTill];
    } else {
      day.outTill = [...outTill] || [];
    }
    // times
    if (day.close) {
      day.close = [...day.close, moment().format("LTS")];
    } else {
      day.close = [moment().format("LTS")] || [];
    }
  } else {
    const keys = Object.keys(totalOrders);
    const orders = keys.map(key => totalOrders[key]);
    days[date] = {
      inTill,
      outTill,
      totalOrders: orders,
      paymentByCard: [paymentByCard],
      revenue: [revenue],
      income: [income],
      members: totalDay,
      cash: [cash],
      close: [moment().format("LTS")]
    };
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(days);
    }, 1000);
  });
};

const fetchCurrentTill = (df = currentTill) => {
  // currentTill = { ...data };
  // console.log(currentTill);
  const totalDay = {
    ...df
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(totalDay);
    }, 1000);
  });
};

const getSumMaster = ({ masters, name, title, price, count }) => {
  const master = masters.find(a => a.value.toLowerCase() === name.toLowerCase());
  if (master) {
    const percent = master.workPercent[title.toLowerCase()];
    if (percent) {
      return Math.ceil((price * count) * (percent / 100));
    } else {
      return Math.ceil((price * count) * (master.defaultPercent / 100));
    }
  }
  return 0;
};

function* sendCart(action) {
  const { payload: { totalCart, totalDay, totalOrders, masters, payment } } = action;
  let data = {};
  const keys = Object.keys(totalOrders);
  let id = Math.max(...keys, 0);
  id += 1;
  totalCart.forEach(item => {
    const { name, price, title, count, category, isMaster } = item;
    const sumMaster = getSumMaster({ masters, name, title, price, count });
    if (!data[name]) {
      data[name] = [];
    }
    data[name].push({
      price,
      count,
      title,
      category,
      isMaster,
      totalCount: price * count,
      orderNumber: id,
      inMaster: isMaster ? sumMaster : 0,
      outMaster: isMaster ? price * count - sumMaster : price * count,
      payment
    });
  });


  const totalDayKeys = Object.keys(totalDay);
  if (totalDayKeys.length) {
    totalDayKeys.forEach(key => {
      if (data[key]) {
        data[key] = [...totalDay[key], ...data[key]];
      } else {
        data[key] = [...totalDay[key]];
      }
    });
  }

  // const i = {
  //   date: moment().format("DD.MM.YY"),
  //   totalDay: data
  // };
  // const fetchTotalDay = yield call(fetchDataDay, i);

  const currentTillFetch = yield call(fetchCurrentTill, data);

  const filterOrders = totalCart.reduce((start, cur) => {
    const { name, price, title, count, category, isMaster } = cur;
    const data = {
      name,
      price,
      title,
      count,
      category,
      isMaster,
      totalCount: price * count
    };
    return [...start, data];
  }, []);

  const orders = {
    [id]: {
      payment: payment,
      data: filterOrders
    }
  };


  yield put(endSendCart({
    totalDay: currentTillFetch,
    totalOrders: orders
  }));
}

function* loadCurrentDay() {
  const data = yield call(fetchCurrentTill);
  // console.log(data);
  yield put(endTotalDay(data));
  yield put(loadApp(true));
};

function* startRemoveTotalDay({ payload }) {
  const data = yield call(fetchDataDay, payload);
  console.log(data);
  if (data) {
    const currentTillFetch = yield call(fetchCurrentTill, {});
    yield put(endSendCart({
      totalDay: currentTillFetch
      // totalOrders: orders
    }));
    yield put(clearTillInfo());
    yield put(lockOpen(true));
    console.log("Смена закрыта");
  }
};

function* shopWatcher() {
  yield takeLatest(startSendCart, sendCart);
  yield takeLatest(loadTotalDay, loadCurrentDay);
  yield takeLatest(startRemoveDay, startRemoveTotalDay);
}

export default function* () {
  yield fork(shopWatcher);
  console.log("Shop saga run");
}

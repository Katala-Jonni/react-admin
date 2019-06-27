import { fork, takeLatest, put, call } from "redux-saga/effects";
import { startSendCart, endSendCart } from "./actions";

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
  const { payload: { totalCart, totalDay, totalOrders, masters } } = action;
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
      outMaster: isMaster ? price * count - sumMaster : price * count
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
    [id]: filterOrders
  };
  yield put(endSendCart({
    totalDay: data,
    totalOrders: orders
  }));
}

function* shopWatcher() {
  yield takeLatest(startSendCart, sendCart);
}

export default function* () {
  yield fork(shopWatcher);
  console.log("Shop saga run");
}

import { fork, takeLatest, put, call } from "redux-saga/effects";
import {
  startSendCart,
  endSendCart,
  loadTotalDay,
  endTotalDay,
  startRemoveDay,
  endTotalOrders,
  endRemoveDay, loadView, endLoadView, addToCartEnd
} from "./actions";
import moment from "moment/min/moment-with-locales";
import currentTill from "./currentTill";
import orders from "./orders";
import days from "./totalDay";
import { loadApp } from "../Admin";
import { endLockOpen } from "../Till/actions";
import { lockClose, lockOpen, clearTillInfo, openTill } from "../Till";
import api from "../../utils/api";
import { addToCartStart } from "./index";

/* fetch */

const fetchViewShop = () => {
  const { baseUrl, shop } = api;
  return fetch(`${baseUrl}${shop}`)
    .then(res => res.json());
};

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
    // totalOrders
    if (day.totalOrders) {
      day.totalOrders = [...day.totalOrders, totalOrders];
    } else {
      day.totalOrders = [totalOrders] || {};
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
      totalOrders: [totalOrders],
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
  const totalDay = {
    ...df
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(totalDay);
    }, 1000);
  });
};

const fetchOrders = (df = orders) => {
  const totalOrders = {
    ...df
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(totalOrders);
    }, 1000);
  });
};

const fetchCurrentDay = async date => {
  const { baseUrl, shop, day } = api;
  const res = await fetch(`${baseUrl}${shop}${day}`);
  return await res.json();
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(days[date]);
  //   }, 1000);
  // });
};

const fetchDaysAdd = async (body) => {
  console.log(body);
  const { baseUrl, shop, day } = api;
  const res = await fetch(`${baseUrl}${shop}${day}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(body)
  });
  return await res.json();
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(days[date]);
  //   }, 1000);
  // });
};

/* Actions */

const getSumMaster = ({ masters, name, title, price, count }) => {
  const master = masters.find(a => a.value.toLowerCase() === name.toLowerCase());
  if (master) {
    const percent = master.workPercent && master.workPercent[title.toLowerCase()];
    if (percent) {
      return Math.ceil((price * count) * (percent / 100));
    } else {
      return Math.ceil((price * count) * (master.defaultPercent / 100));
    }
  }
  return 0;
};

/*
function* sendCart(action) {
  const { payload: { totalCart, totalDay, totalOrders, masters, payment, typeMixed, infoPay, certificateNumber } } = action;
  let data = {};

  const keys = Object.keys(totalOrders);
  let id = Math.max(...keys, 0);
  id += 1;
  let dayInfo = yield call(fetchDays, moment().format("DD.MM.YY"));
  let groupOrderId = 0;
  if (dayInfo && dayInfo.totalOrders) {
    groupOrderId = dayInfo.totalOrders.length;
  }

  let isCertificate = typeMixed && typeMixed.number;
  let certificateInfo = 0;

  // Сертификат
  if (isCertificate) {
    const { members } = typeMixed;
    const crt = [...members].find(item => item.typePay === "certificate");
    if (crt && Array.isArray(crt.count)) {
      certificateInfo = crt.count.map(item => item.label.toLowerCase());
    }
    else {
      certificateInfo = crt.count;
    }
  }


  let certificateSum = [];
  let totalSum = 0;
  totalCart.forEach(item => {
    const { name, price, title, count, category, isMaster } = item;
    const sumMaster = getSumMaster({ masters, name, title, price, count });
    if (!data[name]) {
      data[name] = [];
    }
    let crtSum = 0;
    let isInclude = false;
    if (Array.isArray(certificateInfo)) {
      isInclude = certificateInfo.includes(title.toLowerCase());
      if (isInclude) {
        crtSum = price;
      } else {
        // crtSum = 0;
      }
    } else {
      crtSum = 0;
    }

    certificateSum.push(crtSum);
    if (payment !== "mixed") {
      totalSum += price * count;
    }

    data[name].push({
      price,
      count,
      title,
      category,
      isMaster,
      totalCount: price * count,
      orderNumber: id,
      groupOrderId: groupOrderId,
      // реализовать заказы в виде групп
      inMaster: isMaster ? sumMaster : 0,
      outMaster: isMaster ? price * count - sumMaster : price * count,
      payment: payment === "mixed" ? typeMixed : payment,
      isCertificate: typeMixed && typeMixed.number ? !!typeMixed.number : false,
      certificateSum: crtSum
    });

    if (Array.isArray(certificateInfo) || isInclude) {
      certificateInfo = certificateInfo.length ? certificateInfo.filter(item => item.toLowerCase() !== title.toLowerCase()) : [];
      isInclude = false;
    }
    else {
      certificateInfo = 0;
    }
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
  let payInfo = {};
  infoPay.forEach((item) => {
    const { count, typePay } = item;
    let sum = 0;
    if (payment === "mixed" && typePay !== "certificate") {
      sum = +count;
    } else if (typePay === "certificate") {
      sum = certificateSum.reduce((a, b) => a + b) || +count;
    } else {
      sum = totalSum;
    }
    payInfo[typePay] = sum;
  }, {});

  const orders = {
    [id]: {
      payment: payment,
      typeMixed: payment === "mixed" ? typeMixed : payment,
      data: filterOrders,
      certificateSum: certificateSum.reduce((a, b) => a + b),
      payInfo
    }
  };
  const currentTillFetch = yield call(fetchCurrentTill, data);
  const fetchTotalOrders = yield call(fetchOrders, orders);

  yield put(endSendCart({
    totalDay: currentTillFetch,
    totalOrders: fetchTotalOrders
  }));
  console.log("---END---");
}
*/

function* sendCart(action) {
  // после отправки очистить в стейте сертификат
  const { payload: { totalCart, masters, payment, typeMixed, infoPay, values, certificateInfo: crtInfo } } = action;
  let data = {};
  console.log(totalCart, "totalCart");
  // console.log(typeMixed, "typeMixed");
  // console.log(infoPay, "infoPay");

  const { day: dayInfo } = yield call(fetchCurrentDay);
  let id = 0;
  let groupOrderId = 0;
  if (dayInfo && dayInfo.totalOrders) {
    groupOrderId = dayInfo.totalOrders.length;
    id = dayInfo.totalOrders.length;
  }

  const isCertificate = typeMixed && typeMixed.number;
  let certificateInfo = 0;

  // Сертификат
  if (isCertificate) {
    const { members } = typeMixed;
    const crt = [...members].find(item => item.typePay === "certificate");
    if (crt && Array.isArray(crt.count)) {
      certificateInfo = crt.count.map(item => item.label.toLowerCase());
    }
    else {
      certificateInfo = crt.count;
    }
  }


  let certificateSum = [];
  let totalSum = 0;
  totalCart.forEach(item => {
    const { name, price, title, count, category, isMaster } = item;
    const sumMaster = getSumMaster({ masters, name, title, price, count });
    if (!data[name]) {
      data[name] = [];
    }
    let crtSum = 0;
    let isInclude = false;
    if (Array.isArray(certificateInfo)) {
      isInclude = certificateInfo.includes(title.toLowerCase());
      if (isInclude) {
        crtSum = price;
      } else {
        // crtSum = 0;
      }
    } else {
      crtSum = 0;
    }

    certificateSum.push(crtSum);
    if (payment !== "mixed") {
      totalSum += price * count;
    }

    data[name].push({
      price,
      count,
      title,
      category,
      isMaster,
      totalCount: price * count,
      orderNumber: id,
      groupOrderId: groupOrderId,
      // реализовать заказы в виде групп
      inMaster: isMaster ? sumMaster : 0,
      outMaster: isMaster ? price * count - sumMaster : price * count,
      payment: payment === "mixed" ? typeMixed : payment,
      isCertificate: typeMixed && typeMixed.number ? !!typeMixed.number : false,
      certificateSum: crtSum
    });

    if (Array.isArray(certificateInfo) || isInclude) {
      certificateInfo = certificateInfo.length ? certificateInfo.filter(item => item.toLowerCase() !== title.toLowerCase()) : [];
      isInclude = false;
    }
    else {
      certificateInfo = 0;
    }
  });

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

  let payInfo = {};

  infoPay.forEach((item) => {
    const { count, typePay } = item;
    let sum = 0;
    if (payment === "mixed" && typePay !== "certificate") {
      sum = +count;
    } else if (typePay === "certificate") {
      sum = certificateSum.reduce((a, b) => a + b) || +count;
    } else {
      sum = totalSum;
    }
    payInfo[typePay] = sum;
  }, {});

  const { members } = typeMixed;

  let certificate = null;
  const outMember = members ? members.find((item) => item.typePay === "certificate") : null;
  console.log(crtInfo, "crtInfo");
  if (crtInfo) {
    certificate = {
      _id: crtInfo._id,
      out: outMember ? outMember.count : null
      // amount: payInfo.certificate
    };
    console.log(certificate.out);
  }

  console.log(payInfo, "payInfo");

  const orders = {
    payment: payment,
    typeMixed: payment === "mixed" ? typeMixed : payment,
    data: filterOrders,
    certificateSum: certificateSum.reduce((a, b) => a + b),
    payInfo,
    certificate
  };

  yield call(fetchDaysAdd, { totalDay: data, totalOrders: orders });

  yield put(endSendCart({
    totalDay: [],
    totalOrders: []
  }));
  console.log("---END---");
}

// function* sendCart(action) {
//   const { payload: { totalCart, totalDay, totalOrders, masters, payment, typeMixed, infoPay, certificateNumber } } = action;
//   console.log(totalCart, "totalCart");
//   console.log(masters, "masters");
//   console.log(payment, "payment");
//   console.log(typeMixed, "typeMixed");
//   console.log(infoPay, "infoPay");
//   console.log(certificateNumber, "certificateNumber");
//
//
//   // let data = {};
//   //
//   // const keys = Object.keys(totalOrders);
//   // let id = Math.max(...keys, 0);
//   // id += 1;
//   // let dayInfo = yield call(fetchDays, moment().format("DD.MM.YY"));
//   // let groupOrderId = 0;
//   // if (dayInfo && dayInfo.totalOrders) {
//   //   groupOrderId = dayInfo.totalOrders.length;
//   // }
//   //
//   // let isCertificate = typeMixed && typeMixed.number;
//   // let certificateInfo = 0;
//   //
//   // // Сертификат
//   // if (isCertificate) {
//   //   const { members } = typeMixed;
//   //   const crt = [...members].find(item => item.typePay === "certificate");
//   //   if (crt && Array.isArray(crt.count)) {
//   //     certificateInfo = crt.count.map(item => item.label.toLowerCase());
//   //   }
//   //   else {
//   //     certificateInfo = crt.count;
//   //   }
//   // }
//   //
//   //
//   // let certificateSum = [];
//   // let totalSum = 0;
//   // totalCart.forEach(item => {
//   //   const { name, price, title, count, category, isMaster } = item;
//   //   const sumMaster = getSumMaster({ masters, name, title, price, count });
//   //   if (!data[name]) {
//   //     data[name] = [];
//   //   }
//   //   let crtSum = 0;
//   //   let isInclude = false;
//   //   if (Array.isArray(certificateInfo)) {
//   //     isInclude = certificateInfo.includes(title.toLowerCase());
//   //     if (isInclude) {
//   //       crtSum = price;
//   //     } else {
//   //       // crtSum = 0;
//   //     }
//   //   } else {
//   //     crtSum = 0;
//   //   }
//   //
//   //   certificateSum.push(crtSum);
//   //   if (payment !== "mixed") {
//   //     totalSum += price * count;
//   //   }
//   //
//   //   data[name].push({
//   //     price,
//   //     count,
//   //     title,
//   //     category,
//   //     isMaster,
//   //     totalCount: price * count,
//   //     orderNumber: id,
//   //     groupOrderId: groupOrderId,
//   //     // реализовать заказы в виде групп
//   //     inMaster: isMaster ? sumMaster : 0,
//   //     outMaster: isMaster ? price * count - sumMaster : price * count,
//   //     payment: payment === "mixed" ? typeMixed : payment,
//   //     isCertificate: typeMixed && typeMixed.number ? !!typeMixed.number : false,
//   //     certificateSum: crtSum
//   //   });
//   //
//   //   if (Array.isArray(certificateInfo) || isInclude) {
//   //     certificateInfo = certificateInfo.length ? certificateInfo.filter(item => item.toLowerCase() !== title.toLowerCase()) : [];
//   //     isInclude = false;
//   //   }
//   //   else {
//   //     certificateInfo = 0;
//   //   }
//   // });
//   //
//   //
//   // const totalDayKeys = Object.keys(totalDay);
//   // if (totalDayKeys.length) {
//   //   totalDayKeys.forEach(key => {
//   //     if (data[key]) {
//   //       data[key] = [...totalDay[key], ...data[key]];
//   //     } else {
//   //       data[key] = [...totalDay[key]];
//   //     }
//   //   });
//   // }
//   // const filterOrders = totalCart.reduce((start, cur) => {
//   //   const { name, price, title, count, category, isMaster } = cur;
//   //   const data = {
//   //     name,
//   //     price,
//   //     title,
//   //     count,
//   //     category,
//   //     isMaster,
//   //     totalCount: price * count
//   //   };
//   //   return [...start, data];
//   // }, []);
//   // let payInfo = {};
//   // infoPay.forEach((item) => {
//   //   const { count, typePay } = item;
//   //   let sum = 0;
//   //   if (payment === "mixed" && typePay !== "certificate") {
//   //     sum = +count;
//   //   } else if (typePay === "certificate") {
//   //     sum = certificateSum.reduce((a, b) => a + b) || +count;
//   //   } else {
//   //     sum = totalSum;
//   //   }
//   //   payInfo[typePay] = sum;
//   // }, {});
//   //
//   // const orders = {
//   //   [id]: {
//   //     payment: payment,
//   //     typeMixed: payment === "mixed" ? typeMixed : payment,
//   //     data: filterOrders,
//   //     certificateSum: certificateSum.reduce((a, b) => a + b),
//   //     payInfo
//   //   }
//   // };
//   // const currentTillFetch = yield call(fetchCurrentTill, data);
//   // const fetchTotalOrders = yield call(fetchOrders, orders);
//   //
//   // yield put(endSendCart({
//   //   totalDay: currentTillFetch,
//   //   totalOrders: fetchTotalOrders
//   // }));
//   console.log("---END---");
// }


function* loadCurrentDay() {
  const data = yield call(fetchCurrentTill);
  const orders = yield call(fetchOrders);
  yield put(endTotalDay(data));
  yield put(endTotalOrders(orders));
  yield put(loadApp(true));
};

function* startRemoveTotalDay({ payload }) {
  const data = yield call(fetchDataDay, payload);
  console.log(data);
  if (data) {
    yield call(fetchCurrentTill, {});
    yield call(fetchOrders, {});
    yield put(endRemoveDay());
    yield put(clearTillInfo());
    yield put(lockOpen(true));
    yield put(openTill(false));
    console.log("Смена закрыта");
  }
};

/* Загрузка shop */

function* loadViewShop() {
  const res = yield call(fetchViewShop);
  const { categories, products } = res;
  return yield put(endLoadView({ categories, products }));
}

function* addToCart({ payload }) {
  // console.log(payload);
  return yield put(addToCartEnd(payload));
}

function* shopWatcher() {
  yield takeLatest(loadView, loadViewShop);
  yield takeLatest(addToCartStart, addToCart);

  yield takeLatest(startSendCart, sendCart);
  yield takeLatest(loadTotalDay, loadCurrentDay);
  yield takeLatest(startRemoveDay, startRemoveTotalDay);
}

export default function* () {
  yield fork(shopWatcher);
  // console.log("Shop saga run");
}

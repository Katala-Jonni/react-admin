import { fork, takeLatest, put, call } from "redux-saga/effects";
import { sendCard } from "./index";
import {
  endSendCard,
  startVerifyCard,
  endVerifyCard,
  startSearchNumber,
  endSearchNumber,
  startSearchPhoneNumber,
  startUseCard,
  endUseCard,
  deleteUseCard,
  deleteState
} from "./actions";
import moment from "moment";
import api from "../../utils/api";
import { endVerifyCertificate } from "../Certificate/actions";

let cards = {};
const numbers = {
  [12345678901]: true,
  [12345678902]: true,
  [12345678903]: true
};

const fetchSearchCard = async (number) => {
  try {
    const { baseUrl, sun } = api;
    const res = await fetch(`${baseUrl}${sun}/${number}?search=true`);
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};

const fetchVerificate = async (number) => {
  try {
    const { baseUrl, sun } = api;
    const res = await fetch(`${baseUrl}${sun}/${number}`);
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};

const fetchAddCard = async (body) => {
  const { baseUrl, sun } = api;
  const res = await fetch(`${baseUrl}${sun}/${body.cardNumber}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(body)
  });
  return await res.json();
};

const fetchPutCard = async ({ useInfo, cardNumber }) => {
  const { baseUrl, sun } = api;
  const res = await fetch(`${baseUrl}${sun}/${cardNumber}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(useInfo)
  });
  return await res.json();
};

console.log("-------------------");

const fetchVerifyCardNumber = (item, number) => {
  return new Promise((resolve, reject) => {
    // console.log(item[number]);
    if (item[number]) {
      resolve({
        error: false,
        card: item[number]
      });
    }
    reject({
      error: true,
      card: null
    });
  })
    .then(res => res)
    .catch(error => error);
};

const fetchCards = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cards);
    }, 1000);
  })
    .then(res => res);
};

const fetchGetCurrentCard = (number) => {
  return new Promise(resolve => {
    // const card = cards[number];
    setTimeout(() => {
      resolve(cards[number]);
    }, 1000);
  })
    .then(res => res);
};

const fetchSetCurrentCard = (number, card) => {
  return new Promise(resolve => {
    cards[number] = card;
    setTimeout(() => {
      resolve(cards[number]);
    }, 1000);
  })
    .then(res => res);
};

// const fetchAddCard = data => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       cards = data;
//       resolve({
//         error: false
//       });
//     }, 1000);
//   })
//     .then(res => res);
// };
// function* fetchStartSearchCard({ payload }) {
//   console.log(payload);
//   const answer = yield call(fetchVerifyCardNumber, cards, payload);
//   return yield put(endSearchNumber({
//     isVerifyCardNumber: !!answer.error,
//     verifyPhoneMessage: answer.error ? "Номер не найден" : null,
//     card: answer.card
//   }));
// }
// function* fetchStartSearchPhoneNumber({ payload }) {
//   console.log(payload);
//   const answer = yield call(fetchVerifyCardNumber, cards, payload);
//   console.log(answer);
//   return yield put(endSearchNumber({
//     isVerifyCardNumber: !!answer.error,
//     verifySearchMessage: answer.error ? "Номер не найден" : null,
//     card: answer.card
//   }));
// }

function* delUseCard({ payload }) {
  const { card: { cardNumber }, id } = payload;
  let fetchCard = yield call(fetchGetCurrentCard, cardNumber);
  if (!fetchCard) {
    console.log(`Произошла ошибка, мы не нашли абонемент с номером ${cardNumber}`);
    return false;
  }
  const card = { ...fetchCard };
  card.history = fetchCard.history.filter(item => item.id !== id);
  const newCard = yield call(fetchSetCurrentCard, cardNumber, card);
  yield put(endUseCard(newCard));
}

function* fetchStartSearchCard({ payload: { value } }) {
  const { card, cardStatus } = yield call(fetchSearchCard, value);

  return yield put(endSearchNumber({
    isCard: !!card,
    verifyMessage: !card ? "Такой номер не найден" : null,
    card,
    cardStatus
  }));
}

function* fetchStartVerifyCard({ payload }) {
  const { value } = payload;
  if (!value) {
    return false;
  }
  console.log(value);
  const { isValidNumber, errorMessage } = yield call(fetchVerificate, value);

  return yield put(endVerifyCard({ isCard: isValidNumber, verifyMessage: errorMessage }));


  // const isVerifyCards = yield call(fetchVerifyCardNumber, cards, payload);
  // // console.log(isVerifyCards);
  // if (!isVerifyCards.error) {
  //   return yield put(endVerifyCard({
  //     isVerifyCard: true,
  //     verifyMessage: "Этот номер уже зарегистрирован"
  //     // serverMessage: "Такого номера не существует"
  //   }));
  // }
  // const isVerify = yield call(fetchVerifyCardNumber, numbers, payload);
  // if (!isVerify.error) {
  //   return yield put(endVerifyCard({
  //       isVerifyCard: false,
  //       verifyMessage: null
  //       // serverMessage: false
  //     })
  //   );
  // }
  // return yield put(endVerifyCard({
  //   isVerifyCard: true,
  //   verifyMessage: "Такого номера не существует"
  //   // serverMessage: "Такого номера не существует"
  // }));
};

function* fetchSendCard({ payload }) {
  // let errorMessage = false;
  // let serverMessage = "Абонемент зарегистрирован";
  // let totalCards = yield call(fetchCards);
  // const info = {
  //   date: moment().format("DD.MM.YY"),
  //   place: "Древлянка 14, корпус 1"
  // };
  // const history = [
  //   // {
  //   //   count: 5,
  //   //   place: "Ватутина, 37",
  //   //   date: moment().format("DD.MM.YY h:mm:ss")
  //   // }
  // ];
  // totalCards = {
  //   ...totalCards,
  //   [cardNumber]: { ...rest, cardNumber, ...info, history }
  // };
  // yield call(fetchAddCard, totalCards);
  // yield call(fetchCards);
  // return yield put(endSendCard({ errorMessage, serverMessage }));

  console.log(payload);
  const card = {
    ...payload,
    place: "Древлянка 14, корпус 1"
  };

  const result = yield call(fetchAddCard, card);
  return yield put(deleteState());
  // console.log("Сделать концовку добавления");

}

function* fetchStartUseCard({ payload }) {
  const { card: { cardNumber }, addCount, date } = payload;
  // let fetchCard = yield call(fetchGetCurrentCard, cardNumber);
  // if (!fetchCard) {
  //   console.log(`Произошла ошибка, мы не нашли абонемент с номером ${cardNumber}`);
  //   return false;
  // }
  //
  // const random = Math.floor(Math.random() * 100 + Math.random() * 100);
  //
  // const useInfo = {
  //   id: random,
  //   count: addCount,
  //   place: "Невского, 30",
  //   date
  // };
  // const card = { ...fetchCard };
  // card.history = [...fetchCard.history, useInfo];
  // const newCard = yield call(fetchSetCurrentCard, cardNumber, card);
  // yield put(endUseCard(newCard));

  const useInfo = {
    out: addCount,
    place: "Невского, 30"
  };

  const { card, isValidNumber, errorMessage } = yield call(fetchPutCard, { useInfo, cardNumber });
  // console.log(card);
  yield put(endUseCard(card));
};

function* sunWatcher() {
  yield takeLatest(startSearchNumber, fetchStartSearchCard);
  yield takeLatest(startVerifyCard, fetchStartVerifyCard);
  yield takeLatest(sendCard, fetchSendCard);
  yield takeLatest(startUseCard, fetchStartUseCard);


  // yield takeLatest(startSearchPhoneNumber, fetchStartSearchPhoneNumber);
  yield takeLatest(deleteUseCard, delUseCard);
}

export default function* () {
  yield fork(sunWatcher);
  // console.log("Sun saga run");
}

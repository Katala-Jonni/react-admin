import { fork, takeLatest, put, call } from "redux-saga/effects";
import { sendCard } from "./index";
import {
  endSendCard,
  startVerifyCard,
  endVerifyCard,
  startSearchNumber,
  endSearchNumber,
  startSearchPhoneNumber
} from "./actions";
import moment from "moment";

let cards = {};
const numbers = {
  [12345678901]: true,
  [12345678902]: true,
  [12345678903]: true
};

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

const fetchAddCard = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      cards = data;
      resolve({
        error: false
      });
    }, 1000);
  })
    .then(res => res);
};

function* fetchSendCard({ payload: { cardNumber, ...rest } }) {
  let errorMessage = false;
  let serverMessage = "Абонемент зарегистрирован";
  let totalCards = yield call(fetchCards);
  const info = {
    date: moment().format("DD.MM.YY"),
    place: "Древлянка 14, корпус 1"
  };
  totalCards = {
    ...totalCards,
    [cardNumber]: { ...rest, cardNumber, ...info }
  };
  // totalCards = [...totalCards, payload];
  yield call(fetchAddCard, totalCards);
  const t = yield call(fetchCards);
  console.log(t);
  return yield put(endSendCard({ errorMessage, serverMessage }));
}


function* fetchStartVerifyCard({ payload }) {
  const isVerifyCards = yield call(fetchVerifyCardNumber, cards, payload);
  // console.log(isVerifyCards);
  if (!isVerifyCards.error) {
    return yield put(endVerifyCard({
      isVerifyCard: true,
      verifyMessage: "Этот номер уже зарегистрирован"
      // serverMessage: "Такого номера не существует"
    }));
  }
  const isVerify = yield call(fetchVerifyCardNumber, numbers, payload);
  if (!isVerify.error) {
    return yield put(endVerifyCard({
        isVerifyCard: false,
        verifyMessage: null
        // serverMessage: false
      })
    );
  }
  return yield put(endVerifyCard({
    isVerifyCard: true,
    verifyMessage: "Такого номера не существует"
    // serverMessage: "Такого номера не существует"
  }));
};

function* fetchStartSearchCard({ payload }) {
  const answer = yield call(fetchVerifyCardNumber, cards, payload);
  console.log(answer);
  // if (!answer.error) {
  return yield put(endSearchNumber({
    isVerifyCardNumber: !!answer.error,
    verifyPhoneMessage: answer.error ? "Номер не найден" : null,
    card: answer.card
    // serverMessage: "Такого номера не существует"
  }));
  // }
}

function* fetchStartSearchPhoneNumber({ payload }) {
  console.log(payload);
  const answer = yield call(fetchVerifyCardNumber, cards, payload);
  console.log(answer);
  // if (!answer.error) {
  return yield put(endSearchNumber({
    isVerifyCardNumber: !!answer.error,
    verifySearchMessage: answer.error ? "Номер не найден" : null,
    card: answer.card
    // serverMessage: "Такого номера не существует"
  }));
}

function* sunWatcher() {
  yield takeLatest(sendCard, fetchSendCard);
  yield takeLatest(startVerifyCard, fetchStartVerifyCard);
  yield takeLatest(startSearchNumber, fetchStartSearchCard);
  yield takeLatest(startSearchPhoneNumber, fetchStartSearchPhoneNumber);
}

export default function* () {
  yield fork(sunWatcher);
  console.log("Sun saga run");
}

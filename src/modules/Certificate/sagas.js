import { fork, takeLatest, put, call } from "redux-saga/effects";
import {
  sendCertificate,
  endSendCertificate,
  startVerifyCertificate,
  endVerifyCertificate,
  startSearchNumber,
  endSearchNumber
} from "./actions";
import moment from "moment/moment";
// import { endSearchNumber, startSearchNumber } from "../Sun/actions";

let certificates = {
  12345: {}
};
const certificateNumbers = {
  1234567890: true,
  salon: true,
  12345: true
};

const fetchCertificate = value => {
  return new Promise(resolve => {
    resolve(certificateNumbers[value]);
  });
};

const fetchCertificates = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(certificates);
    }, 1000);
  });
};

const fetchAddCertificate = cards => {
  return new Promise(resolve => {
    certificates = cards;
    resolve(certificates);
  });
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

console.log("-------------------");

function* verifyCertificateNumber({ payload }) {
  const { value } = payload;
  const isVerifyCertificate = yield call(fetchCertificate, value);
  let isCertificate = true;
  let verifyMessage = null;
  if (!isVerifyCertificate) {
    isCertificate = false;
    verifyMessage = "Такого номера не существует";
  }
  const certificates = yield call(fetchCertificates);
  if (certificates[value]) {
    isCertificate = false;
    verifyMessage = "Данный сертификат уже зарегистрирован";
  }
  return yield put(endVerifyCertificate({ isCertificate, verifyMessage }));
};

function* fetchSendCertificate({ payload }) {
  let errorMessage = false;
  let serverMessage = "Сертификат зарегистрирован";
  let totalCards = yield call(fetchCertificates);
  const { certificateNumber } = payload;
  const date = moment().format("DD.MM.YY");
  totalCards = {
    ...totalCards,
    [certificateNumber]: {
      ...payload,
      date,
      dateEnd: moment(date, "DD.MM.YY").add(6, "month").format("DD.MM.YY"),
      place: "Древлянка 14, корпус 1",
      history: []
    }
  };
  const totalCertificate = yield call(fetchAddCertificate, totalCards);
  if (!totalCertificate) {
    errorMessage = true;
    serverMessage = "Произошла ошибка, попробуйте снова!";
  }
  console.log(totalCertificate);
  return yield put(endSendCertificate({ errorMessage, serverMessage }));
}

function* startSearchCertificate({ payload }) {
  console.log(payload);
  const certificates = yield call(fetchCertificates);
  let isCertificate = false;
  let verifyMessage = null;
  if (!certificates) {
    isCertificate = true;
    verifyMessage = "Что-то пошло не так, попробуйте снова";
  }
  if (!certificates[payload]) {
    isCertificate = true;
    verifyMessage = "Такой сертификат не найден";
  }
  // console.log(isCertificate, "isCertificate");
  // console.log(verifyMessage, "verifyMessage");
  return yield put(endSearchNumber({
    isCertificate,
    verifyMessage,
    certificate: certificates[payload] ? certificates[payload] : null
  }));
}

function* certificateWatcher() {
  // верификация номера сертификата в базе
  yield takeLatest(startVerifyCertificate, verifyCertificateNumber);
  // создание сертификата
  yield takeLatest(sendCertificate, fetchSendCertificate);
  // поиск сертификата
  yield takeLatest(startSearchNumber, startSearchCertificate);
}

export default function* () {
  yield fork(certificateWatcher);
  console.log("Certificate saga run");
}

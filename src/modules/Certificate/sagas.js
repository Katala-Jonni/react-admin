import { fork, takeLatest, put, call } from "redux-saga/effects";
import {
  sendCertificate,
  endSendCertificate,
  startVerifyCertificate,
  endVerifyCertificate,
  startSearchNumber,
  endSearchNumber, deleteState
} from "./actions";
import moment from "moment/moment";
import api from "../../utils/api";
import momentTimeZone from "moment-timezone";
// import { endSearchNumber, startSearchNumber } from "../Sun/actions";

let certificates = {
  12345: {}
};
const certificateNumbers = {
  1234567890: true,
  salon: true,
  12345: true
};

const getTimeZone = (currentDate) => momentTimeZone.tz(currentDate, "Europe/Moscow");

const getStatus = (date) => {
  const dateZone = getTimeZone(date);
  return moment().isSameOrBefore(moment(dateZone));
};

const fetchAddCertificateE = async (body) => {
  const { baseUrl, certificate } = api;
  const res = await fetch(`${baseUrl}${certificate}/${body.certificateNumber}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(body)
  });
  return await res.json();
};

const fetchVerificate = async (number) => {
  try {
    const { baseUrl, certificate } = api;
    const res = await fetch(`${baseUrl}${certificate}/${number}`);
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};

const fetchSearchCertificate = async (number) => {
  try {
    const { baseUrl, certificate } = api;
    const res = await fetch(`${baseUrl}${certificate}/${number}?search=true`);
    return await res.json();
  } catch (e) {
    console.log(e);
  }
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
  if (!value) {
    return false;
  }
  const { isValidNumber, errorMessage } = yield call(fetchVerificate, value);

  return yield put(endVerifyCertificate({ isCertificate: isValidNumber, verifyMessage: errorMessage }));

  // const isVerifyCertificate = yield call(fetchCertificate, value);
  // let isCertificate = true;
  // let verifyMessage = null;
  // if (!isVerifyCertificate) {
  //   isCertificate = false;
  //   verifyMessage = "Такого номера не существует";
  // }
  // const certificates = yield call(fetchCertificates);
  // if (certificates[value]) {
  //   isCertificate = false;
  //   verifyMessage = "Данный сертификат уже зарегистрирован";
  // }
  // return yield put(endVerifyCertificate({ isCertificate: isValidNumber, verifyMessage }));
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
      history: [],
      used: true
    }
  };

  if (payload.typeCertificate === "amount" && payload.servicesType) {
    delete payload.servicesType;
  }

  const certificate = {
    ...payload,
    place: "Древлянка 14, корпус 1"
  };

  const result = yield call(fetchAddCertificateE, certificate);

  console.log(result);


  const res = yield call(fetchAddCertificate);
  const totalCertificate = yield call(fetchAddCertificate, totalCards);
  if (!totalCertificate) {
    errorMessage = true;
    serverMessage = "Произошла ошибка, попробуйте снова!";
  }
  console.log(totalCertificate);
  return yield put(deleteState());
  // return yield put(endSendCertificate({ errorMessage, serverMessage }));
}

function* startSearchCertificate({ payload: { value, isPay } }) {
  const { certificate, certificateStatus: crtStatus } = yield call(fetchSearchCertificate, value);
  if (isPay && certificate) {
    return yield put(endSearchNumber({
      isCertificate: true,
      verifyMessage: !crtStatus ? "Данный сертификат неактивный" : null,
      certificate: !crtStatus ? null : certificate,
      certificateStatus: crtStatus
    }));
  }

  return yield put(endSearchNumber({
    isCertificate: !!certificate,
    verifyMessage: !certificate ? "Такой сертификат не найден" : null,
    certificate,
    certificateStatus: crtStatus
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
  // console.log("Certificate saga run");
}

// {
//   "certificateNumber": "8f24e325-ff5e",
//   "certificateSum": "1000",
//   "phoneNumber": "89212285381",
//   "place": "Древлянка 14, корпус 1",
//   "typeCertificate": "amount",
//   "typePay": "Сертификат"
// }

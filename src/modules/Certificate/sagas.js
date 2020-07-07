import { fork, takeLatest, put, call } from "redux-saga/effects";
import { reset } from "redux-form";
import {
  sendCertificate,
  endSendCertificate,
  startVerifyCertificate,
  endVerifyCertificate,
  startSearchNumber,
  endSearchNumber, deleteState, successRegistrationCertificate
} from "./actions";
import moment from "moment/moment";
import api from "../../utils/api";
import momentTimeZone from "moment-timezone";
import { Fetch } from "../../utils/fetch";
import { Storage, storageKey } from "../../storage";
import { handle_request_open } from "../Admin";
// import { endSearchNumber, startSearchNumber } from "../Sun/actions";

const { baseUrl, certificate } = api;

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

  console.log(value, "@@Certificate/saga/verifyCertificateNumber");
  const { isValidNumber, errorMessage } = yield call(Fetch.get(`${baseUrl}${certificate}/${value}`));

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
  const { values: { certificateNumber } } = payload;
  const date = moment().format("DD.MM.YY");
  const storage = Storage.getStorage(storageKey.authKey);
  totalCards = {
    ...totalCards,
    [certificateNumber]: {
      ...payload.values,
      date,
      dateEnd: moment(date, "DD.MM.YY").add(6, "month").format("DD.MM.YY"),
      place: storage.id,
      history: [],
      used: true
    }
  };

  if (payload.values.typeCertificate === "amount" && payload.values.servicesType) {
    delete payload.servicesType;
  }

  const certificateData = {
    ...payload.values,
    place: storage.id
  };

  const result = yield call(Fetch.post(`${baseUrl}${certificate}/${certificateData.certificateNumber}`, certificateData));

  console.log(result, "@@Certificate/saga/fetchSendCertificate");

  if (result.message === "ok") {
    yield put(deleteState());
    // yield put(successRegistrationCertificate());
    // yield put({
    //   type: "@@redux-form/RESET", meta: {
    //     form: "addCertificate"
    //   }
    // });
    // yield call(reset("addCertificate"));
    // payload.props.dispatch(reset("addCertificate"));
  }
  return yield put(handle_request_open({ alertMessage: result.alertMessage }));

}

function* startSearchCertificate({ payload: { value, isPay } }) {
  const { baseUrl, certificate: certificateUrl } = api;
  const { certificate, certificateStatus: crtStatus } = yield call(Fetch.get(`${baseUrl}${certificateUrl}/${value}?search=true`));
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

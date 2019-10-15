import { fork, takeLatest, put, call } from "redux-saga/effects";
import { endEditCertificate, endSearchCertificate, startEditCertificate, startSearchCertificate } from "./actions";

let certificates = {
  [12345]: {
    certificateNumber: "12345",
    certificateSum: "1300",
    date: "07.10.19",
    phoneNumber: "89212285381",
    place: "Древлянка 14, корпус 1",
    // typeCertificate: "service",
    typeCertificate: "amount",
    typePay: "Сертификат",
    // servicesType: [
    //   { value: "hair-2", label: "Стрижка на средние волосы" },
    //   { value: "cilia-7", label: "Окрашивание ресниц" },
    //   { value: "cilia-8", label: "Наращивание ресниц" },
    // ]
  },
  ['q']: {
    certificateNumber: "q",
    // certificateSum: "1300",
    date: "07.10.19",
    phoneNumber: "89212285381",
    place: "Древлянка 14, корпус 1",
    typeCertificate: "service",
    // typeCertificate: "amount",
    typePay: "Сертификат",
    servicesType: [
      { value: "hair-2", label: "Стрижка на средние волосы" },
      { value: "cilia-7", label: "Окрашивание ресниц" },
      { value: "cilia-8", label: "Наращивание ресниц" },
    ]
  }
};

const fetchEditCertificates = item => {
  return new Promise(resolve => {
    certificates = { ...certificates, [item.certificateNumber]: { ...item } };
    resolve(certificates[item.certificateNumber]);
  });
};

const fetchCertificate = value => {
  return new Promise((resolve) => {
    resolve(certificates[value]);
  });
};

console.log("-------------");

function* searchCertificate({ payload }) {
  const { value } = payload;
  const answer = yield call(fetchCertificate, value);
  if (answer) {
    return yield put(endSearchCertificate(answer));
  }
}

function* editCertificate({ payload }) {
  const { number, value } = payload;
  const certificate = yield call(fetchCertificate, number);
  if (certificate) {
    // проверить можно value меньше итоговой суммы
    certificate.certificateSum -= value;
    const newCertificate = yield call(fetchEditCertificates, certificate);
    return yield put(endEditCertificate(newCertificate));
  }
}

function* templateWatcher() {
  // поиск сертификата
  yield takeLatest(startSearchCertificate, searchCertificate);
  // изменение сертификата
  yield takeLatest(startEditCertificate, editCertificate);
}

export default function* () {
  yield fork(templateWatcher);
  console.log("Template saga run");
}

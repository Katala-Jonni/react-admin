import { fork, takeLatest, put, call } from "redux-saga/effects";
import { loadNumberCertificate, endNumberCertificate } from "./actions";

const certificates = {};
const certificateNumbers = {
  1234567890: true,
  salon: true
};

const fetchCertificate = value => {
  return new Promise(resolve => {
    resolve(certificateNumbers[value]);
  });
};

function* loadCertificateNumber({ payload }) {
  const { value } = payload;
  const isVerifyCertificate = yield call(fetchCertificate, value);
  let isCertificate = true;
  let verifyMessage = null;
  if (!isVerifyCertificate) {
    isCertificate = false;
    verifyMessage = "Такого номера не существует";
  }
  return yield put(endNumberCertificate({ isCertificate, verifyMessage }));
};

function* certificateWatcher() {
  yield takeLatest(loadNumberCertificate, loadCertificateNumber);
}

export default function* () {
  yield fork(certificateWatcher);
  console.log("Certificate saga run");
}

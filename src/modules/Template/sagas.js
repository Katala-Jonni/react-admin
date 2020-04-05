import { fork, takeLatest, put, call } from "redux-saga/effects";
import api from "utils/api";
import {
  startLoadCatalog,
  endLoadCatalog
} from "./actions";

const fetchData = async () => {
  try {
    const { baseUrl, catalog } = api;
    const res = await fetch(`${baseUrl}${catalog}`);
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};

function* startLoad() {
  yield put(endLoadCatalog({}));
}

function* catalogWatcher() {
  yield takeLatest(startLoadCatalog, startLoad);
}

export default function* () {
  yield fork(catalogWatcher);
  console.log("Catalog saga run");
};

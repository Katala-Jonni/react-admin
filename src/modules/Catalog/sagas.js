import moment from "moment";
import { fork, takeLatest, put, call } from "redux-saga/effects";
import api from "../../utils/api";
import { destroy } from "redux-form";
import {
  changeIgnoreCounts, changeReset, endEditMasters,
  endLoadLabel,
  endLoadMaster, endPostMasters,
  loadLabel,
  loadMaster,
  reduxFormMasterChange, reduxResetForm, set_current_todo_null, startDeleteMaster, startEditMasters, startMasters
} from "./actions";
import { editMasters } from "../Calendar";
import { loadView } from "../Shop";
import { endLoadView } from "../Shop/actions";

const fetchData = async () => {
  try {
    const { baseUrl, master } = api;
    const res = await fetch(`${baseUrl}${master}`);
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};

const fetchViewShop = () => {
  const { baseUrl, shop } = api;
  return fetch(`${baseUrl}${shop}`)
    .then(res => res.json());
};

const fetchChangeLabel = async (id, body) => {
  const { baseUrl, master, label } = api;
  const res = await fetch(`${baseUrl}${master}${label}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(body)
    });
  return await res.json();
};

const fetchDeleteMaster = async (id) => {
  console.log(id);
  const { baseUrl, master } = api;
  const res = await fetch(`${baseUrl}${master}/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    });
  return await res.json();
};

const fetchEdit = async ({ id, body }) => {
  try {
    const { baseUrl, master } = api;
    console.log(`${baseUrl}${master}/${id}`);
    console.log();
    const res = await fetch(`${baseUrl}${master}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(body)
    });
    return await res.json();
  } catch (e) {
    return console.log(e);
  }
};

const fetchPost = async ({ body }) => {
  try {
    const { baseUrl, master } = api;
    const res = await fetch(`${baseUrl}${master}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(body)
    });
    return await res.json();
  } catch (e) {
    return console.log(e);
  }
};

function* loadMasterResource() {
  const res = yield call(fetchViewShop);
  const { categories, products } = res;
  yield put(endLoadView({ categories, products }));
  return yield put(endLoadMaster({ masters: products, labels: categories }));
}

function* loadLabelResource(action) {
  console.log("testLabel");
  const { payload } = action;
  const { masters } = yield call(fetchChangeLabel, payload.id, payload.label);
  // console.log(masters);
  yield put(endLoadLabel({ masters }));
  yield put(editMasters({ masters }));
}

function* reduxFormChange(action) {
  const { payload, meta: { form, field } } = action;
  if (form === "masterForm") {
    const searchMember = field.indexOf(".");
    const word = field.slice(searchMember + 1);
    const searchIndexIn = field.indexOf("[");
    const searchIndexOut = field.indexOf("]");
    const index = field.slice(searchIndexIn + 1, searchIndexOut);
    if (searchMember > -1) {
      yield put(changeIgnoreCounts({ index: +index, value: word === "count" ? +payload : payload, name: word }));
    }
    // else {
    //   const word = field.slice(searchMember + 1);
    //   const searchIndexIn = field.indexOf("[");
    //   const searchIndexOut = field.indexOf("]");
    //   const index = field.slice(searchIndexIn + 1, searchIndexOut);
    //   yield put(changeIgnoreCounts({
    //     index: +index, value: word === "count" ? 50 : {
    //       value: "Выберите услугу",
    //       label: "Выберите услугу"
    //     }, name: word
    //   }));
    // }
  }
}

function* reduxFormReset(action) {
  // destroy("masterForm");
  yield put(destroy("masterForm"));
  yield put(changeReset(true));
}

function* editMastersState(action) {
  const { payload: { id, values } } = action;
  const { masters } = yield call(fetchEdit, { id, body: values });
  const currentTodo = masters.find((item) => item._id === id);
  yield put(endEditMasters({ masters, currentTodo }));
  yield put(editMasters({ masters }));
}

function* startMastersState(action) {
  const { payload: { values } } = action;
  const { masters } = yield call(fetchPost, { body: values });
  yield put(endPostMasters({ masters }));
  yield put(editMasters({ masters }));
  // set_current_todo_null(this.props.masters);
  yield put(set_current_todo_null(masters));
}

function* deleteMasters(action) {
  const { payload } = action;
  // удаление с базы
  // const { masters } = yield call(fetchDeleteMaster, payload._id);
  // yield put(editMasters({ masters }));
  // yield put(set_current_todo_null(masters));
}

function* masterWatcher() {
  yield takeLatest(loadMaster, loadMasterResource);
  yield takeLatest(loadLabel, loadLabelResource);
  yield takeLatest(reduxFormMasterChange, reduxFormChange);
  yield takeLatest(reduxResetForm, reduxFormReset);
  yield takeLatest(startEditMasters, editMastersState);
  yield takeLatest(startMasters, startMastersState);
  yield takeLatest(startDeleteMaster, deleteMasters);
}

export default function* () {
  yield fork(masterWatcher);
  // console.log("Master saga run");
};

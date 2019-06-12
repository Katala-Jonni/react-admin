import defaultResource from "./defaultResource";
import { fork, takeLatest, put, call } from "redux-saga/effects";
import {
  addMasters,
  selectDay,
  showDay,
  changeMasters,
  deleteMasters,
  editMastersStart,
  editMastersEnd,
  editEvents,
  defaultDay,
  loadResource,
  endLoadResource,
  deleteEvents
  // deleteEventsChangeStore
} from "./actions";
import totalResource from "./totalResource";
import masters from "./mastersData";
import moment from "moment";

const fetchData = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      totalResource,
      masters
    }), 1000);
  })
    .then(res => res);


function* loadTotalResource() {
  const totalResource = yield call(fetchData);
  yield put(endLoadResource(totalResource));
}


function* showCurrentDay(action) {
  const { payload: { data, resource } } = action;

  if (resource) {
    return yield put({
      type: showDay.toString(),
      payload: {
        date: moment(data).format("DD.MM.YY"),
        resource
      }
    });
  } else {
    return yield put({
      type: showDay.toString(),
      payload: {
        date: null,
        resource: [defaultResource[0]]
      }
    });
  }
}

function* addMastersDay(action) {
  const { payload } = action;
  console.log(payload);
  let isHasResource = false;
  let copyCurrentResource = null;
  const resourceCurrentDate = payload.totalResource[payload.date];
  if (resourceCurrentDate) {
    isHasResource = true;
    copyCurrentResource = [...resourceCurrentDate, ...payload.value];
  }
  const pld = {
    date: payload.date,
    totalResource: isHasResource ? copyCurrentResource : [defaultResource[0], ...payload.value]
  };

  return yield put(addMasters(pld));
}

function* editMastersDay(action) {
  // если есть уже в базе мастера и мы хотим его изменить
  const { payload } = action;
  console.log(payload);
  const { resource, endValue, startValue, events, date } = payload;
  const findResource = resource.find(item => item.resourceTitle === startValue.value);
  if (!findResource) return;
  console.log(findResource, "findResource");
  const diffResource = resource.filter(item => item.resourceTitle !== startValue.value);
  const copyResource = { ...findResource };
  copyResource.resourceTitle = endValue.value;
  copyResource.resourceId = endValue.value;

  const newEvents = events.filter(item => {
    if (
      moment(item.start).format("DD.MM.YY") === moment(date).format("DD.MM.YY") && item.resourceId.toLowerCase() === startValue.value.toLowerCase()) {
      item.originally = item.resourceId;
      item.resourceId = endValue.value;
    }
    return item;
  });

  return yield put({
    type: editMastersEnd.toString(), payload: {
      events: newEvents,
      resource: [...diffResource, copyResource],
      date: moment(date).format("DD.MM.YY")
    }
  });
}

function* deleteEventsDay(action, ...rest) {
  const { payload: { events, selectEventValue } } = action;
  // console.log(events);
  // console.log(selectEventValue);
  const data = events.filter(a => a.id !== selectEventValue.id);
  return yield put(editEvents(data));
  // console.log(payload);
  // return yield put({
  //   type: addMasters.toString(),
  //   payload
  // });
}

function* deleteMastersDay(action) {
  const { payload } = action;
  // console.log(payload);
  // return yield put({
  //   type: addMasters.toString(),
  //   payload
  // });
}

function* calendarWatcher() {
  yield takeLatest(loadResource, loadTotalResource);
  yield takeLatest(selectDay, showCurrentDay);
  yield takeLatest(changeMasters, addMastersDay);
  yield takeLatest(editMastersStart, editMastersDay);
  yield takeLatest(deleteEvents, deleteEventsDay);
  // yield takeLatest(deleteMasters, deleteMastersDay);
}

export default function* () {
  yield fork(calendarWatcher);
  console.log("Calendar saga run");
}

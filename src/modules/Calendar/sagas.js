import moment from "moment";
import defaultResource from "./defaultResource";
import { fork, takeLatest, put, call } from "redux-saga/effects";
import api from "../../utils/api";
import {
  addMasters,
  selectDay,
  showDay,
  changeMasters,
  editMastersStart,
  editMastersEnd,
  editEvents,
  loadResource,
  endLoadResource,
  deleteEvents,
  updateEvents,
  selectViewEvents,
  loadViewEvents,
  addEvents,
  addResource,
  editResource,
  updateResource
} from "./actions";
import { Fetch } from "../../utils/fetch";
import { Storage, storageKey } from "../../storage";

const { baseUrl, calendar, event, resource } = api;


const editEvent = (events) => {
  // if (Array.isArray(events)) {
  //   return events.map((item) => {
  //     const start = moment(item.date).set({ "hour": moment(item.start).hour(), "minute": moment(item.start).minute() });
  //     const end = moment(item.date).set({ "hour": moment(item.end).hour(), "minute": moment(item.end).minute() });
  //     item.start = start._d;
  //     item.end = end._d;
  //     item.date = start._d;
  //     return item;
  //   });
  // }

  return events.map((item) => {
    const start = moment(item.date).set({ "hour": moment(item.start).hour(), "minute": moment(item.start).minute() });
    const end = moment(item.date).set({ "hour": moment(item.end).hour(), "minute": moment(item.end).minute() });
    item.start = start._d;
    item.end = end._d;
    item.date = start._d;
    return item;
  });
  // return [];
};

/* fetch */
const fetchData = async () => {
  try {
    const { baseUrl, calendar } = api;
    const res = await fetch(`${baseUrl}${calendar}`);
    return await res.json();
  } catch (e) {
    console.log(e);
  }

  // return new Promise(resolve => {
  //   setTimeout(() => resolve({
  //     totalResource,
  //     masters,
  //     events
  //   }), 1000);
  // })
  //   .then(res => res);
};

const fetchEventsPost = async (body) => {
  const { baseUrl, calendar, event } = api;
  const res = await fetch(`${baseUrl}${calendar}${event}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(body)
  });
  return await res.json();
};

const fetchEventsPut = async (body) => {
  const { baseUrl, calendar, event } = api;
  const res = await fetch(`${baseUrl}${calendar}${event}/${body._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(body)
  });
  return await res.json();
};

const fetchEventsDelete = async (_id) => {
  const { baseUrl, calendar, event } = api;
  const res = await fetch(`${baseUrl}${calendar}${event}/${_id}`, {
    method: "DELETE"
  });
  return await res.json();
};

const fetchCurrentEvent = async (id) => {
  const { baseUrl, calendar, event } = api;
  const res = await fetch(`${baseUrl}${calendar}${event}/${id}`);
  return await res.json();
};

const fetchResourcePut = async (body) => {
  const { baseUrl, calendar, resource } = api;
  const res = await fetch(`${baseUrl}${calendar}${resource}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(body)
  });
  return await res.json();
};

const fetchResourceEventPut = async (body) => {
  const { baseUrl, calendar, resource, event } = api;
  const res = await fetch(`${baseUrl}${calendar}${resource}${event}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(body)
  });
  return await res.json();
};

/* action */

function* addMastersDay(action) {
  const { payload } = action;
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


function* loadTotalResource(action) {
  try {
    const { payload } = action;
    // const totalResource = yield call(fetchData);
    // console.log(payload.place);
    // if (payload && payload.place) {
    //
    // }
    const storage = Storage.getStorage(storageKey.authKey);
    const res = yield call(Fetch.get(`${baseUrl}${calendar}/${storage.id}`));
    if (!res.message) {
      res.events = editEvent(res.events);
      yield put(endLoadResource(res));
      // return console.log(res.message, "@CalendarSaga loadTotalResource");
    }

  } catch (e) {
    console.log(e, "@CalendarSaga loadTotalResource");
  }
}

function* selectCurrentDay(action) {
  const { payload: { date, resource, defaultResource } } = action;
  const isResource = resource && resource.length;
  const resourceInfo = isResource ? resource : [defaultResource];
  const dateView = isResource ? moment(date).format("DD.MM.YY") : null;

  return yield put({
    type: showDay.toString(),
    payload: {
      date: dateView,
      resource: resourceInfo
    }
  });
}

function* addEventsDay(action) {
  const { payload } = action;
  console.log(payload);
  // const res = yield call(fetchEventsPost, payload);
  const res = yield call(Fetch.post(`${baseUrl}${calendar}${event}`, payload));
  const events = editEvent(res);
  return yield put(editEvents(events));
}

function* updateEventsDay(action) {
  const { payload } = action;
  console.log(payload);
  // const res = yield call(fetchEventsPut, payload);
  const res = yield call(Fetch.put(`${baseUrl}${calendar}${event}/${payload._id}`, payload));
  const events = editEvent(res);
  return yield put(editEvents(events));
}

function* deleteEventsDay(action) {
  const { payload } = action;
  const res = yield call(Fetch.delete(`${baseUrl}${calendar}${event}/${payload}`, payload));
  const events = editEvent(res.events);
  return yield put(editEvents(events));
}

function* selectView(action) {
  const { payload } = action;
  // const res = yield call(fetchCurrentEvent, moment(payload).valueOf());
  const res = yield call(Fetch.get(`${baseUrl}${calendar}${event}/${moment(payload.day).valueOf()}/${payload.place}`));
  const { resource: { resourcesInfo: resource }, events } = res;
  return yield put(loadViewEvents({
    resource,
    events: editEvent(events),
    totalResource: null
  }));
}

function* addResourceMasters(action) {
  const { payload } = action;
  // const res = yield call(fetchResourcePut, payload);
  const res = yield call(Fetch.put(`${baseUrl}${calendar}${api.resource}`, payload));
  const { resource: { resourcesInfo: resource }, totalResource } = res;
  return yield put(loadViewEvents({
    resource,
    events: null,
    totalResource
  }));
}

function* editMastersDay(action) {
  const { payload } = action;
  // const res = yield call(fetchResourceEventPut, payload);
  const res = yield call(Fetch.put(`${baseUrl}${calendar}${api.resource}${event}`, payload));
  const { resource: { resourcesInfo: resource }, events, totalResource } = res;
  return yield put(loadViewEvents({
    resource,
    events: editEvent(events),
    totalResource
  }));
}

function* calendarWatcher() {
  yield takeLatest(loadResource, loadTotalResource);
  yield takeLatest(selectDay, selectCurrentDay);
  yield takeLatest(addEvents, addEventsDay);
  yield takeLatest(updateEvents, updateEventsDay);
  yield takeLatest(deleteEvents, deleteEventsDay);
  yield takeLatest(selectViewEvents, selectView);
  yield takeLatest(addResource, addResourceMasters);
  yield takeLatest(editMastersStart, editMastersDay);

  // yield takeLatest(changeMasters, addMastersDay);
}

export default function* () {
  yield fork(calendarWatcher);
  // console.log("Calendar saga run");
}

import { createAction } from "redux-actions";

export const selectDay = createAction("@@Calendar/SELECT_DAY");
export const loadResource = createAction("@@Calendar/LOAD_RESOURCE");
export const endLoadResource = createAction("@@Calendar/END_LOAD_RESOURCE");
export const showDay = createAction("@@Calendar/SHOW_DAY");
export const defaultDay = createAction("@@Calendar/DEFAULT_DAY");
export const addMasters = createAction("@@Calendar/ADD_MASTERS");
export const changeMasters = createAction("@@Calendar/CHANGE_MASTERS");
export const editMastersStart = createAction("@@Calendar/EDIT_MASTERS_START");
export const editMastersEnd = createAction("@@Calendar/EDIT_MASTERS_END");
export const editEvents = createAction("@@Calendar/EDIT_EVENTS");
export const deleteMasters = createAction("@@Calendar/DELETE_MASTERS");
export const deleteEvents = createAction("@@Calendar/DELETE_EVENTS");
export const changeCalendar = createAction("@@Calendar/CHANGE_CALENDAR");

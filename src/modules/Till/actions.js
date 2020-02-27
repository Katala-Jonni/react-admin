import { createAction } from "redux-actions";

export const addInTill = createAction("@@Till/ADD_TO_CASHIER");
export const changeInTill = createAction("@@Till/CHANGE_IN_TILL");
export const loadInfoTill = createAction("@@Till/LOAD_INFO_DAY");
export const endLoadInfoTill = createAction("@@Till/END_LOAD_INFO_DAY");
export const addOutTill = createAction("@@Till/ADD_OUT_TILL");
export const changeOutTill = createAction("@@Till/CHANGE_OUT_TILL");
export const loadTill = createAction("@@Till/LOAD_TILL");
export const loadStateTill = createAction("@@Till/LOAD_STATE_TILL");
export const openTill = createAction("@@Till/OPEN_TILL");
export const changeTill = createAction("@@Till/CHANGE_TILL");
export const changeTillInfo = createAction("@@Till/CHANGE_TILL_INFO");
export const lockOpen = createAction("@@Till/LOCK_OPEN");
export const lockClose = createAction("@@Till/LOCK_CLOSE");
export const endLockOpen = createAction("@@Till/END_LOCK_OPEN");
export const clearTillInfo = createAction("@@Till/CLEAR_TILL_INFO");

export const startLoadDay = createAction("@@Till/START_LOAD_DAY");
export const endLoadDay = createAction("@@Till/END_LOAD_DAY");

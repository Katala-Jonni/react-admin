import { createAction } from "redux-actions";

export const addInTill = createAction("@@Till/ADD_TO_CASHIER");
export const changeInTill = createAction("@@Till/CHANGE_IN_TILL");
export const loadInfoTill = createAction("@@Till/LOAD_INFO_DAY");
export const endLoadInfoTill = createAction("@@Till/END_LOAD_INFO_DAY");
export const addOutTill = createAction("@@Till/ADD_OUT_TILL");
export const changeOutTill = createAction("@@Till/CHANGE_OUT_TILL");
export const loadTill = createAction("@@Till/LOAD_TILL");
export const changeTill = createAction("@@Till/CHANGE_TILL");
export const changeTillInfo = createAction("@@Till/CHANGE_TILL_INFO");

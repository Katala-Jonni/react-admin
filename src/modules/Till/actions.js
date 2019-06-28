import { createAction } from "redux-actions";

export const addInTill = createAction("@@Till/ADD_TO_CASHIER");
export const changeInTill = createAction("@@Till/CHANGE_IN_TILL");
export const addOutTill = createAction("@@Till/ADD_OUT_TILL");
export const changeOutTill = createAction("@@Till/CHANGE_OUT_TILL");
export const loadTill = createAction("@@Till/LOAD_TILL");
export const changeTill = createAction("@@Till/CHANGE_TILL");

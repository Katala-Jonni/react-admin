import { createAction } from "redux-actions";

export const addToCart = createAction("@@Shop/ADD_TO_CART");
export const loadTotalDay = createAction("@@Shop/LOAD_TOTAL_DAY");
export const startRemoveDay = createAction("@@Shop/START_REMOVE_DAY");
export const endRemoveDay = createAction("@@Shop/END_REMOVE_DAY");
export const endTotalDay = createAction("@@Shop/END_TOTAL_DAY");
export const startSendCart = createAction("@@Shop/START_SEND_CART");
export const endSendCart = createAction("@@Shop/END_SEND_CART");
export const changeSubmitSwitch = createAction("@@Shop/SUBMIT_SWITCH_CART");

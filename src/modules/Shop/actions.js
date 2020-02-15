import { createAction } from "redux-actions";

export const addToCartStart = createAction("@@Shop/ADD_TO_CART_START");
export const addToCartEnd = createAction("@@Shop/ADD_TO_CART_END");
export const loadTotalDay = createAction("@@Shop/LOAD_TOTAL_DAY");
export const startRemoveDay = createAction("@@Shop/START_REMOVE_DAY");
export const endRemoveDay = createAction("@@Shop/END_REMOVE_DAY");
export const endTotalDay = createAction("@@Shop/END_TOTAL_DAY");
export const endTotalOrders = createAction("@@Shop/END_TOTAL_ORDERS");
export const startSendCart = createAction("@@Shop/START_SEND_CART");
export const endSendCart = createAction("@@Shop/END_SEND_CART");
export const changeSubmitSwitch = createAction("@@Shop/SUBMIT_SWITCH_CART");
export const changePays = createAction("@@Shop/CHANGE_PAYS");
export const plusPayCount = createAction("@@Shop/PLUS_PAY_COUNT");
export const minusPayCount = createAction("@@Shop/MINUS_PAY_COUNT");
export const loadView = createAction("@@Shop/LOAD_VIEW");
export const endLoadView = createAction("@@Shop/END_LOAD_VIEW");

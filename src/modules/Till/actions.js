import { createAction } from "redux-actions";

export const addToCart = createAction("@@Shop/ADD_TO_CART");
export const startSendCart = createAction("@@Shop/START_SEND_CART");
export const endSendCart = createAction("@@Shop/END_SEND_CART");
export const changeSubmitSwitch = createAction("@@Shop/SUBMIT_SWITCH_CART");

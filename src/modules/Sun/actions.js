import { createAction } from "redux-actions";

export const sendCard = createAction("@@Sun/SEND_CARD");
export const endSendCard = createAction("@@Sun/END_SEND_CARD");
export const startVerifyCard = createAction("@@Sun/START_VERIFY_CARD");
export const endVerifyCard = createAction("@@Sun/END_VERIFY_CARD");
export const resetErrorMessage = createAction("@@Sun/RESET_ERROR_MESSAGE");
export const startSearchNumber = createAction("@@Sun/START_SEARCH_NUMBER");
export const endSearchNumber = createAction("@@Sun/END_SEARCH_NUMBER");
export const startSearchPhoneNumber = createAction("@@Sun/START_SEARCH_PHONE_NUMBER");
export const endSearchPhoneNumber = createAction("@@Sun/END_SEARCH_PHONE_NUMBER");
export const startUseCard = createAction("@@Sun/START_USE_CARD");
export const endUseCard = createAction("@@Sun/END_USE_CARD");
export const turnOnLoader = createAction("@@Sun/TURN_ON_LOADER");
export const deleteUseCard = createAction("@@Sun/DELETE_USE_CARD");
export const deleteState = createAction("@@Sun/DELETE_STATE");

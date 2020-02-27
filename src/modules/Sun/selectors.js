import { createSelector } from "reselect";

const getSunState = state => state.sun;

export const getCard = createSelector(getSunState, state => state.card);
export const getServerMessage = createSelector(getSunState, state => state.serverMessage);
export const getError = createSelector(getSunState, state => state.errorMessage);
export const getIsVerifyCard = createSelector(getSunState, state => state.isVerifyCard);
export const getVerifyMessage = createSelector(getSunState, state => state.verifyMessage);
export const getVerifyPhoneNumber = createSelector(getSunState, state => state.isVerifyPhoneNumber);
export const getVerifyPhoneMessage = createSelector(getSunState, state => state.verifyPhoneMessage);
export const getVerifyCardNumber = createSelector(getSunState, state => state.isVerifyCardNumber);
export const getVerifyCardMessage = createSelector(getSunState, state => state.verifyCardMessage);
export const getLoader = createSelector(getSunState, state => state.loader);
export const getIsCard = createSelector(getSunState, state => state.isCard);
export const getCardStatus = createSelector(getSunState, state => state.cardStatus);

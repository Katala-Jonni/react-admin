import { createSelector } from "reselect";

const getMixedPaySagasState = state => state.mixedPay;

export const getCash = createSelector(getMixedPaySagasState, state => state.cash);
export const getCard = createSelector(getMixedPaySagasState, state => state.card);
export const getCertificate = createSelector(getMixedPaySagasState, state => state.certificate);
export const getCurrentCertificate = createSelector(getMixedPaySagasState, state => state.currentCertificate);

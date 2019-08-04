import { createSelector } from "reselect";

const getCertificateState = state => state.certificate;

export const getCertificate = createSelector(getCertificateState, state => state.certificate);
export const getIsCertificate = createSelector(getCertificateState, state => state.isCertificate);
export const getVerifyMessage = createSelector(getCertificateState, state => state.verifyMessage);

import { createSelector } from "reselect";

const getCertificateState = state => state.certificate;

export const getCertificate = createSelector(getCertificateState, state => state.certificate);
export const getIsCertificate = createSelector(getCertificateState, state => state.isCertificate);
export const getVerifyMessage = createSelector(getCertificateState, state => state.verifyMessage);
export const getLoader = createSelector(getCertificateState, state => state.loader);
export const getLoaderCertificate = createSelector(getCertificateState, state => state.loaderCertificate);
export const getCertificateStatus = createSelector(getCertificateState, state => state.certificateStatus);
export const getSuccessRegistration = createSelector(getCertificateState, state => state.successRegistration);

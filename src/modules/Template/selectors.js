import { createSelector } from "reselect";

const getTemplateState = state => state.template;

export const getCash = createSelector(getTemplateState, state => state.cash);
export const getCard = createSelector(getTemplateState, state => state.card);
export const getCertificate = createSelector(getTemplateState, state => state.certificate);
export const getCurrentCertificate = createSelector(getTemplateState, state => state.currentCertificate);

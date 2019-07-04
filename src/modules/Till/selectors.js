import { createSelector } from "reselect";

const getTillState = state => state.till;

export const getInTill = createSelector(getTillState, state => state.inTill);
export const getOutTill = createSelector(getTillState, state => state.outTill);
export const getOutTillCategory = createSelector(getTillState, state => state.outTillCategory);
export const getInTillSum = createSelector(getTillState, state => state.inTillSum);
export const getOutTillSum = createSelector(getTillState, state => state.outTillSum);
export const getCash = createSelector(getTillState, state => state.cash);
export const getPaymentByCard = createSelector(getTillState, state => state.paymentByCard);
export const getRevenue = createSelector(getTillState, state => state.revenue);
export const getIncome = createSelector(getTillState, state => state.income);
export const getTillInfoView = createSelector(getTillState, state => state.tillInfoView);

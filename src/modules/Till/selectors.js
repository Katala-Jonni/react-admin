import { createSelector } from "reselect";
import administrators from "./administrators";

const getTillState = state => state.till;

export const getInTill = createSelector(getTillState, state => state.inTill);
export const getstateTill = createSelector(getTillState, state => state.viewTill);
export const getOutTill = createSelector(getTillState, state => state.outTill);
export const getOutTillCategory = createSelector(getTillState, state => state.outTillCategory);
export const getAdministrators = createSelector(getTillState, state => state.administrators);
export const getInTillSum = createSelector(getTillState, state => state.inTillSum);
export const getOutTillSum = createSelector(getTillState, state => state.outTillSum);
export const getCash = createSelector(getTillState, state => state.cash);
export const getPaymentByCard = createSelector(getTillState, state => state.paymentByCard);
export const getRevenue = createSelector(getTillState, state => state.revenue);
export const getIncome = createSelector(getTillState, state => state.income);
export const getTillInfoView = createSelector(getTillState, state => state.tillInfoView);
export const getLock = createSelector(getTillState, state => state.lock);
export const getPayCategory = createSelector(getTillState, state => state.payCategory);
export const getTill = createSelector(getTillState, state => state.till);
export const getExpense = createSelector(getTillState, state => state.expense);

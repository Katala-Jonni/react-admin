import { createSelector } from "reselect";

const getTillState = state => state.till;

export const getInTill = createSelector(getTillState, state => state.inTill);
export const getOutTill = createSelector(getTillState, state => state.outTill);

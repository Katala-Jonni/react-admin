import { createSelector } from "reselect";

const getAdminState = state => state.app;

export const getLoad = createSelector(getAdminState, state => state.isLoad);
export const getDay = createSelector(getAdminState, state => state.isDay);
export const getError = createSelector(getAdminState, state => state.isError);

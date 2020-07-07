import { createSelector } from "reselect";

const getAdminState = state => state.app;

export const getLoad = createSelector(getAdminState, state => state.isLoad);
export const getDay = createSelector(getAdminState, state => state.isDay);
export const getError = createSelector(getAdminState, state => state.isError);
export const getAdministrators = createSelector(getAdminState, state => state.administrators);
export const getPlace = createSelector(getAdminState, state => state.place);

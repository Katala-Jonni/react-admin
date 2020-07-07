import { createSelector } from "reselect";

const getAdminState = state => state.app;

export const getLoad = createSelector(getAdminState, state => state.isLoad);
export const getDay = createSelector(getAdminState, state => state.isDay);
export const getError = createSelector(getAdminState, state => state.isError);
export const getAdministrators = createSelector(getAdminState, state => state.administrators);
export const getPlace = createSelector(getAdminState, state => state.place);
export const getIsAuthorized = createSelector(getAdminState, state => state.isAuthorized);
export const getErrorMessage = createSelector(getAdminState, state => state.errorMessage);
export const getStartLoader = createSelector(getAdminState, state => state.startLoader);
export const getRoles = createSelector(getAdminState, state => state.roles);
export const getAlertMessage = createSelector(getAdminState, state => state.alertMessage);
export const getShowMessage = createSelector(getAdminState, state => state.showMessage);

import { createSelector } from "reselect";

const getAdminState = state => state.app;

export const getLoad = createSelector(getAdminState, state => state.isLoad);

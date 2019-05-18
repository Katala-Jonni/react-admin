import { createSelector } from "reselect";

const getCalendarState = state => state.calendar;

export const getResource = createSelector(getCalendarState, state => state.resource);
export const getWizard = createSelector(getCalendarState, state => state.isWizardView);
export const getEvents = createSelector(getCalendarState, state => state.events);
export const getTotalResource = createSelector(getCalendarState, state => state.totalResource);
export const getTotalMasters = createSelector(getCalendarState, state => state.masters);
export const getIsDay = createSelector(getCalendarState, state => state.isDay);

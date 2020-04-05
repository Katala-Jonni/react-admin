import { createSelector } from "reselect";

const getCalendarState = state => state.calendar;

export const getResource = createSelector(getCalendarState, state => state.resource);
export const getEvents = createSelector(getCalendarState, state => state.events);
export const getTotalResource = createSelector(getCalendarState, state => state.totalResource);
export const getTotalMasters = createSelector(getCalendarState, state => state.masters);
export const getIsDay = createSelector(getCalendarState, state => state.isDay);
export const getCurrentEvents = createSelector(getCalendarState, state => state.currentEvents);
export const getDefaultResource = createSelector(getCalendarState, state => state.defaultResource);
export const getMasters = createSelector(getCalendarState, state => state.masters);

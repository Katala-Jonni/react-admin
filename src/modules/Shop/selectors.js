import { createSelector } from "reselect";

const getCalendarState = state => state.shop;

export const getTotalCart = createSelector(getCalendarState, state => state.totalCart);

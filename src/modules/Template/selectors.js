import { createSelector } from "reselect";

const getMasterState = state => state.master;

export const getSearchTodo = createSelector(getMasterState, state => state.searchTodo);

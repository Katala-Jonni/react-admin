import { createSelector } from "reselect";

const getMasterState = state => state.master;

export const getSearchTodo = createSelector(getMasterState, state => state.searchTodo);
export const getAlertMessage = createSelector(getMasterState, state => state.alertMessage);
export const getLoader = createSelector(getMasterState, state => state.loader);
export const getLoaderForm = createSelector(getMasterState, state => state.loaderForm);
export const getShowMessage = createSelector(getMasterState, state => state.showMessage);
export const getDrawerState = createSelector(getMasterState, state => state.drawerState);
export const getAllToDos = createSelector(getMasterState, state => state.allToDos);
export const getCurrentTodo = createSelector(getMasterState, state => state.currentTodo);
export const getUser = createSelector(getMasterState, state => state.user);
export const getSelectedToDos = createSelector(getMasterState, state => state.selectedToDos);
export const getLabelMenuState = createSelector(getMasterState, state => state.labelMenuState);
export const getOptionMenuState = createSelector(getMasterState, state => state.optionMenuState);
export const getToDos = createSelector(getMasterState, state => state.toDos);
export const getFilter = createSelector(getMasterState, state => state.filter);
export const getTodoConversation = createSelector(getMasterState, state => state.todoConversation);
export const getConversation = createSelector(getMasterState, state => state.conversation);
export const getMasters = createSelector(getMasterState, state => state.masters);
export const getLabels = createSelector(getMasterState, state => state.labels);
export const getServices = createSelector(getMasterState, state => state.services);
export const getIgnoreMembers = createSelector(getMasterState, state => state.ignoreMembers);
export const getReset = createSelector(getMasterState, state => state.resetForm);
export const getErrorMessage = createSelector(getMasterState, state => state.errorMessage);

import { createAction } from "redux-actions";

export const on_sortend = createAction("@@Master/ON_SORTEND");
export const select_all_todo = createAction("@@Master/SELECT_ALL_TODO");
export const get_all_todo = createAction("@@Master/GET_ALL_TODO");
export const get_unselected_all_todo = createAction("@@Master/GET_UNSELECTED_ALL_TODO");
export const get_starred_todo = createAction("@@Master/GET_STARRED_TODO");
export const get_unstarred_todo = createAction("@@Master/GET_UNSTARRED_TODO");
export const get_important_todo = createAction("@@Master/GET_IMPORTANT_TODO");
export const get_unimportant_todo = createAction("@@Master/GET_UNIMPORTANT_TODO");
export const on_label_update = createAction("@@Master/ON_LABEL_UPDATE");
export const on_todo_update = createAction("@@Master/ON_TODO_UPDATE");
export const on_delete_todo = createAction("@@Master/ON_DELETE_TODO");
export const search_todo = createAction("@@Master/SEARCH_TODO");
export const show_todos = createAction("@@Master/SHOW_TODOS");
export const get_todo_conversation = createAction("@@Master/GET_TODO_CONVERSATION");
export const on_todo_checked = createAction("@@Master/ON_TODO_CHECKED");
export const on_todo_add = createAction("@@Master/ON_TODO_ADD");
export const on_todo_select = createAction("@@Master/ON_TODO_SELECT");
export const set_current_todo_null = createAction("@@Master/SET_CURRENT_TODO_NULL");
export const remove_label = createAction("@@Master/REMOVE_LABEL");
export const update_search = createAction("@@Master/UPDATE_SEARCH");


export const on_label_select = createAction("@@Master/ON_LABEL_SELECT");
export const on_option_menu_item_select = createAction("@@Master/ON_OPTION_MENU_ITEM_SELECT");
export const on_option_menu_select = createAction("@@Master/ON_OPTION_MENU_SELECT");
export const on_label_menu_item_select = createAction("@@Master/ON_LABEL_MENU_ITEM_SELECT");
export const get_nav_labels = createAction("@@Master/GET_NAV_LABELS");
export const get_nav_filters = createAction("@@Master/GET_NAV_FILTERS");
export const on_toggle_drawer = createAction("@@Master/ON_TOGGLE_DRAWER");
export const handle_request_close = createAction("@@Master/HANDLE_REQUEST_CLOSE");
export const on_hide_loader = createAction("@@Master/ON_HIDE_LOADER");


export const loadMaster = createAction("@@Master/LOAD_MASTER");
export const endLoadMaster = createAction("@@Master/END_LOAD_MASTER");

export const loadLabel = createAction("@@Master/LOAD_LABEL");
export const endLoadLabel = createAction("@@Master/END_LOAD_LABEL");
export const deleteState = createAction("@@Master/DELETE_STATE");
export const changeIgnoreMembers = createAction("@@Master/CHANGE_IGNORE_MEMBERS");
export const changeIgnoreCounts = createAction("@@Master/CHANGE_IGNORE_COUNTS");
export const deleteIgnoreMembers = createAction("@@Master/DELETE_IGNORE_MEMBERS");
export const startEditMasters = createAction("@@Master/START_EDIT_MEMBERS");
export const endEditMasters = createAction("@@Master/END_EDIT_MEMBERS");
export const startMasters = createAction("@@Master/START_MASTERS");
export const endPostMasters = createAction("@@Master/END_POST_MEMBERS");
export const startDeleteMaster = createAction("@@Master/START_DELETE_MASTER");
export const endDeleteMaster = createAction("@@Master/END_DELETE_MASTER");
export const changeReset = createAction("@@Master/CHANGE_RESET");
export const startErrorMessage = createAction("@@Master/START_ERROR_MESSAGE");
export const reduxFormMasterChange = createAction("@@redux-form/CHANGE");
export const reduxResetForm = createAction("@@redux-form/RESET");

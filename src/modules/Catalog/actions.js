import { createAction } from "redux-actions";

export const on_sortend = createAction("@@Catalog/ON_SORTEND");
export const select_all_todo = createAction("@@Catalog/SELECT_ALL_TODO");
export const get_all_todo = createAction("@@Catalog/GET_ALL_TODO");
export const get_all_catalog = createAction("@@Catalog/GET_ALL_CATALOG");
export const get_unselected_all_todo = createAction("@@Catalog/GET_UNSELECTED_ALL_TODO");
export const get_starred_todo = createAction("@@Catalog/GET_STARRED_TODO");
export const get_unstarred_todo = createAction("@@Catalog/GET_UNSTARRED_TODO");
export const get_important_todo = createAction("@@Catalog/GET_IMPORTANT_TODO");
export const get_unimportant_todo = createAction("@@Catalog/GET_UNIMPORTANT_TODO");
export const on_label_update = createAction("@@Catalog/ON_LABEL_UPDATE");
export const on_todo_update = createAction("@@Catalog/ON_TODO_UPDATE");
export const on_delete_todo = createAction("@@Catalog/ON_DELETE_TODO");
export const search_todo = createAction("@@Catalog/SEARCH_TODO");
export const show_todos = createAction("@@Catalog/SHOW_TODOS");
export const get_todo_conversation = createAction("@@Catalog/GET_TODO_CONVERSATION");
export const on_todo_checked = createAction("@@Catalog/ON_TODO_CHECKED");
export const on_todo_add = createAction("@@Catalog/ON_TODO_ADD");
export const on_todo_select = createAction("@@Catalog/ON_TODO_SELECT");
export const set_current_todo_null = createAction("@@Catalog/SET_CURRENT_TODO_NULL");
export const remove_label = createAction("@@Catalog/REMOVE_LABEL");
export const update_search = createAction("@@Catalog/UPDATE_SEARCH");


export const on_label_select = createAction("@@Catalog/ON_LABEL_SELECT");
export const on_option_menu_item_select = createAction("@@Catalog/ON_OPTION_MENU_ITEM_SELECT");
export const on_option_menu_select = createAction("@@Catalog/ON_OPTION_MENU_SELECT");
export const on_label_menu_item_select = createAction("@@Catalog/ON_LABEL_MENU_ITEM_SELECT");
export const get_nav_labels = createAction("@@Catalog/GET_NAV_LABELS");
export const get_nav_filters = createAction("@@Catalog/GET_NAV_FILTERS");
export const on_toggle_drawer = createAction("@@Catalog/ON_TOGGLE_DRAWER");
export const handle_request_close = createAction("@@Catalog/HANDLE_REQUEST_CLOSE");
export const on_hide_loader = createAction("@@Catalog/ON_HIDE_LOADER");


export const loadMaster = createAction("@@Catalog/LOAD_MASTER");
export const endLoadMaster = createAction("@@Catalog/END_LOAD_MASTER");

export const loadLabel = createAction("@@Catalog/LOAD_LABEL");
export const endLoadLabel = createAction("@@Catalog/END_LOAD_LABEL");
export const deleteState = createAction("@@Catalog/DELETE_STATE");
export const changeIgnoreMembers = createAction("@@Catalog/CHANGE_IGNORE_MEMBERS");
export const changeIgnoreCounts = createAction("@@Catalog/CHANGE_IGNORE_COUNTS");
export const deleteIgnoreMembers = createAction("@@Catalog/DELETE_IGNORE_MEMBERS");
export const startEditMasters = createAction("@@Catalog/START_EDIT_MEMBERS");
export const endEditMasters = createAction("@@Catalog/END_EDIT_MEMBERS");
export const startMasters = createAction("@@Catalog/START_MEMBERS");
export const endPostMasters = createAction("@@Catalog/END_POST_MEMBERS");
export const startDeleteMaster = createAction("@@Catalog/START_DELETE_MASTER");
export const endDeleteMaster = createAction("@@Catalog/END_DELETE_MASTER");
export const changeReset = createAction("@@Catalog/CHANGE_RESET");
export const startEditProduct = createAction("@@Catalog/START_EDIT_PRODUCT");
export const endEditProduct = createAction("@@Catalog/END_EDIT_PRODUCT");
export const startEditCategory = createAction("@@Catalog/START-EDIT_CATEGORY");
export const endEditCategory = createAction("@@Catalog/END_EDIT_CATEGORY");
export const startSendCategory = createAction("@@Catalog/START_SEND_CATEGORY");
export const endSendCategory = createAction("@@Catalog/END_SEND_CATEGORY");
export const startSendProduct = createAction("@@Catalog/START_SEND_PRODUCT");
export const endSendProduct = createAction("@@Catalog/END_SEND_PRODUCT");
export const currentTodoNull = createAction("@@Catalog/CURRENT_TODO_NULL");
export const startErrorMessage = createAction("@@Catalog/START_ERROR_MESSAGE");
export const endErrorMessage = createAction("@@Catalog/END_ERROR_MESSAGE");
export const loadIndicator = createAction("@@Catalog/LOAD_INDICATOR");
export const reduxFormMasterChange = createAction("@@redux-form/CHANGE");
export const reduxResetForm = createAction("@@redux-form/RESET");

import { createAction } from "redux-actions";

export const loadApp = createAction("@@Admin/LOAD_APP");
export const startApp = createAction("@@Admin/START_APP");
export const endApp = createAction("@@Admin/END_APP");
export const errorApp = createAction("@@Admin/ERROR_APP");
export const startStateAdmin = createAction("@@Admin/START_STATE_ADMIN");
export const getLoginStart = createAction("@@Admin/GET_LOGIN_START");
export const getLoginEnd = createAction("@@Admin/GET_LOGIN_END");
export const setErrorMessage = createAction("@@Admin/SET_ERROR_MESSAGE");
export const startAuth = createAction("@@Admin/START_AUTH");
export const endAuth = createAction("@@Admin/END_AUTH");
export const handle_request_open = createAction("@@Admin/HANDLE_REQUEST_OPEN");
export const handle_request_close = createAction("@@Admin/HANDLE_REQUEST_CLOSE");

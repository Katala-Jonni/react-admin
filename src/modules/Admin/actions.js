import { createAction } from "redux-actions";

export const loadApp = createAction("@@Admin/LOAD_APP");
export const startApp = createAction("@@Admin/START_APP");
export const endApp = createAction("@@Admin/END_APP");
export const errorApp = createAction("@@Admin/ERROR_APP");

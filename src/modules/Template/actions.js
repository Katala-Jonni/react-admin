import { createAction } from "redux-actions";

export const changeType = createAction("@@Template/CHANGE_TYPE");
export const removeType = createAction("@@Template/REMOVE_TYPE");
export const startSearchCertificate = createAction("@@Template/START_SEARCH_CERTIFICATE");
export const endSearchCertificate = createAction("@@Template/END_SEARCH_CERTIFICATE");
export const startEditCertificate = createAction("@@Template/START_EDIT_CERTIFICATE");
export const endEditCertificate = createAction("@@Template/END_EDIT_CERTIFICATE");

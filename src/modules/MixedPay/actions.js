import { createAction } from "redux-actions";

export const changeType = createAction("@@MixedPaySagas/CHANGE_TYPE");
export const removeType = createAction("@@MixedPaySagas/REMOVE_TYPE");
export const startSearchCertificate = createAction("@@MixedPaySagas/START_SEARCH_CERTIFICATE");
export const endSearchCertificate = createAction("@@MixedPaySagas/END_SEARCH_CERTIFICATE");
export const startEditCertificate = createAction("@@MixedPaySagas/START_EDIT_CERTIFICATE");
export const endEditCertificate = createAction("@@MixedPaySagas/END_EDIT_CERTIFICATE");

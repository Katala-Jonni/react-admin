import { createAction } from "redux-actions";

export const loadNumberCertificate = createAction("@@Certificate/LOAD_NUMBER_CERTIFICATE");
export const endNumberCertificate = createAction("@@Certificate/END_NUMBER_CERTIFICATE");
export const sendCertificate = createAction("@@Certificate/SEND_CERTIFICATE");
export const endSendCertificate = createAction("@@Certificate/END_SEND_CERTIFICATE");
export const startVerifyCertificate = createAction("@@Certificate/START_VERIFY_CERTIFICATE");
export const endVerifyCertificate = createAction("@@Certificate/END_VERIFY_CERTIFICATE");
export const startSearchNumber = createAction("@@Certificate/START_SEARCH_NUMBER");
export const endSearchNumber = createAction("@@Certificate/END_SEARCH_NUMBER");
export const turnOnLoader = createAction("@@Certificate/TURN_ON_LOADER");
export const turnOnLoaderCertificate = createAction("@@Certificate/TURN_ON_LOADER_CERTIFICATE");
export const deleteState = createAction("@@Certificate/DELETE_STATE");

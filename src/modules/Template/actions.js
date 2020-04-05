import { createAction } from "redux-actions";

export const startLoadCatalog = createAction("@@Catalog/START_LOAD_CATALOG");
export const endLoadCatalog = createAction("@@Catalog/END_LOAD_CATALOG");

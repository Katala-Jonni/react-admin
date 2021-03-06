import { createSelector } from "reselect";

const getShopState = state => state.shop;

export const getTotalCart = createSelector(getShopState, state => state.totalCart);
export const getTotalDay = createSelector(getShopState, state => state.totalDay);
export const getTotalOrders = createSelector(getShopState, state => state.totalOrders);
export const getIsSubmit = createSelector(getShopState, state => state.isSubmit);
export const getTypePays = createSelector(getShopState, state => state.typePays);
export const getCategory = createSelector(getShopState, state => state.categories);
export const getProducts = createSelector(getShopState, state => state.products);
export const getErrorMessage = createSelector(getShopState, state => state.errorMessage);
export const getAlertMessage = createSelector(getShopState, state => state.alertMessage);
export const getShowMessage = createSelector(getShopState, state => state.showMessage);
export const getViewCart = createSelector(getShopState, state => state.openViewCart);

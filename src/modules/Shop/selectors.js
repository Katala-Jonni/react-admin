import { createSelector } from "reselect";

const getShopState = state => state.shop;

export const getTotalCart = createSelector(getShopState, state => state.totalCart);
export const getTotalDay = createSelector(getShopState, state => state.totalDay);
export const getTotalOrders = createSelector(getShopState, state => state.totalOrders);
export const getIsSubmit = createSelector(getShopState, state => state.isSubmit);
export const getTypePays = createSelector(getShopState, state => state.typePays);

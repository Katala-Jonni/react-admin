import { addToCart, endSendCart, changeSubmitSwitch, endTotalDay, endRemoveDay, endTotalOrders } from "./actions";

const initialData = () => {
  return {
    totalCart: [],
    totalDay: {},
    totalOrders: {},
    isSubmit: false
  };
};

const initialState = {
  ...initialData()
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case addToCart.toString():
      // console.log(payload);
      return {
        ...state,
        totalCart: payload,
        isSubmit: false
      };
    case endSendCart.toString():
      console.log(payload);
      return {
        ...state,
        totalDay: payload.totalDay,
        totalOrders: { ...state.totalOrders, ...payload.totalOrders },
        totalCart: [],
        isSubmit: true
      };
    case changeSubmitSwitch.toString():
      // console.log(payload);
      return {
        ...state,
        isSubmit: payload
      };
    case endTotalDay.toString():
      // console.log(payload, "endTotalDay");
      return {
        ...state,
        totalDay: { ...state.totalDay, ...payload }
      };
    case endTotalOrders.toString():
      // console.log(payload, "endTotalOrders");
      return {
        ...state,
        totalOrders: { ...state.totalOrders, ...payload }
      };
    case endRemoveDay.toString():
      // console.log(payload, "endRemoveDay");
      return {
        ...initialData()
      };
    default: {
      return state;
    }
  }
};

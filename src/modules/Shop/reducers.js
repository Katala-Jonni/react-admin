import { addToCart, endSendCart, changeSubmitSwitch } from "./actions";

const initialState = {
  totalCart: [],
  totalDay: {},
  totalOrders: {},
  isSubmit: false
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
      // console.log(payload);
      return {
        ...state,
        totalDay: payload.totalDay,
        totalOrders: {...state.totalOrders, ...payload.totalOrders},
        totalCart: [],
        isSubmit: true
      };
    case changeSubmitSwitch.toString():
      // console.log(payload);
      return {
        ...state,
        isSubmit: payload
      };
    default: {
      return state;
    }
  }
};

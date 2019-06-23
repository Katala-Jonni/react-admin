import { addToCart } from "./actions";

const initialState = {
  totalCart: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case addToCart.toString():
      // console.log(payload);
      return {
        ...state,
        totalCart: payload
      };
    default: {
      return state;
    }
  }
};

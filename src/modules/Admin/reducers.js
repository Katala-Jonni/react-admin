import { loadApp } from "./actions";

const initialState = {
  isLoad: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case loadApp.toString():
      // console.log(payload);
      return {
        ...state,
        isLoad: payload
      };
    default: {
      return state;
    }
  }
};

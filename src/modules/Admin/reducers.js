import { loadApp, startApp } from "./actions";

const initialState = {
  isLoad: false,
  isDay: false
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
    case startApp.toString():
      // console.log(payload);
      return {
        ...state,
        isDay: payload
      };
    default: {
      return state;
    }
  }
};

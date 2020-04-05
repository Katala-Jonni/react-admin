import { endApp, loadApp, startApp } from "./actions";

const initialState = {
  isLoad: false,
  isDay: false,
  isError: null
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
    case endApp.toString():
      const { day, error } = payload;
      // console.log(payload);
      return {
        ...state,
        isDay: day,
        isError: error
      };
    default: {
      return state;
    }
  }
};

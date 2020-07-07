import { getLoginEnd } from "./actions";

const getInitialState = () => {
  return {
    // isLoad: false,
    // isDay: false,
    // isError: null,
    // administrators: [],
    // place: "5ed2bd63bbe4b89fd8120fe8"
  };
};

const initialState = {
  ...getInitialState()
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case getLoginEnd.toString():
      // console.log(payload);
      return {
        ...state
      };
    default: {
      return state;
    }
  }
};

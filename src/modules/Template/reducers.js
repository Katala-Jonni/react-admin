import {
  endLoadCatalog
} from "./actions";

const INIT_STATE = {};


export default (state = INIT_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case endLoadCatalog.toString(): {
      return {
        ...state
      };
    }
    default:
      return state;
  }
};

import { changeTill, changeInTill, changeOutTill } from "./actions";
import outTillCategory from "./outTillCategory";

const initialState = {
  inTill: [],
  outTill: [],
  outTillCategory
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case changeTill.toString():
      return {
        ...state,
        ...payload
      };
    case changeInTill.toString():
      return {
        ...state,
        inTill: [...state.inTill, payload]
      };
    case changeOutTill.toString():
      return {
        ...state,
        outTill: [...state.outTill, payload]
      };
    default: {
      return state;
    }
  }
};

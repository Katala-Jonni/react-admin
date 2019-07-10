import { changeTill, changeInTill, changeOutTill, endLoadInfoTill, changeTillInfo, endLockOpen } from "./actions";
import outTillCategory from "./outTillCategory";

const initialState = {
  inTill: [],
  outTill: [],
  inTillSum: 0,
  outTillSum: 0,
  cash: 0,
  paymentByCard: 0,
  revenue: 0,
  income: 0,
  outTillCategory,
  tillInfoView: false,
  lock: true
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
        inTill: [...payload]
      };
    case changeOutTill.toString():
      return {
        ...state,
        outTill: [...payload]
      };
    case endLoadInfoTill.toString():
      // console.log(payload);
      return {
        ...state,
        ...payload
      };
    case changeTillInfo.toString():
      return {
        ...state,
        ...payload
      };
    case endLockOpen.toString():
      return {
        ...state,
        lock: payload
      };
    default: {
      return state;
    }
  }
};

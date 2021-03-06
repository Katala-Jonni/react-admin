import {
  changeTill,
  changeInTill,
  changeOutTill,
  endLoadInfoTill,
  changeTillInfo,
  endLockOpen,
  openTill, endLoadDay, endLastAdd
} from "./actions";
import outTillCategory from "./outTillCategory";
import administrators from "./administrators";

const initialState = {
  inTill: [],
  outTill: [],
  inTillSum: 0,
  outTillSum: 0,
  cash: 0,
  // paymentByCard: 0,
  revenue: 0,
  income: 0,
  expense: 0,
  payCategory: {
    // cash: 0,
    // card: 0,
    // certificate: 0
  },
  till: 0,
  outTillCategory,
  administrators,
  tillInfoView: false,
  lock: true,
  viewTill: false,
  totalDay: {},
  totalOrders: [],
  pay: {
    card: 0,
    cash: 0,
    certificate: 0
  },
  lastDay: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case endLoadDay.toString():
      return {
        ...state,
        ...payload
      };
    case changeTill.toString():
      return {
        ...state,
        ...payload
      };
    case changeInTill.toString():
      return {
        ...state,
        ...payload
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
    case openTill.toString():
      return {
        ...state,
        viewTill: payload
      };
    case endLastAdd.toString():
      return {
        ...state,
        lastDay: payload.lastDay
      };
    default: {
      return state;
    }
  }
};

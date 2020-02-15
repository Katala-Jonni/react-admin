import {
  endSendCart,
  changeSubmitSwitch,
  endTotalDay,
  endRemoveDay,
  endTotalOrders,
  changePays,
  plusPayCount,
  minusPayCount,
  endLoadView,
  addToCartEnd
} from "./actions";

const initialData = () => {
  return {
    categories: [],
    products: [],
    totalCart: [],
    totalDay: {},
    totalOrders: {},
    isSubmit: false,
    typePays: {
      cash: false,
      card: false
    },
    payCount: 0
  };
};

const initialState = {
  ...initialData()
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case endLoadView.toString(): {
      return {
        ...state,
        categories: payload.categories,
        products: payload.products
      };
    }
    case addToCartEnd.toString():
      return {
        ...state,
        totalCart: payload,
        isSubmit: false
      };
    case endSendCart.toString():
      console.log(payload);
      return {
        ...state,
        totalDay: payload.totalDay,
        totalOrders: { ...state.totalOrders, ...payload.totalOrders },
        totalCart: [],
        isSubmit: true
      };
    case changeSubmitSwitch.toString():
      // console.log(payload);
      return {
        ...state,
        isSubmit: payload
      };
    case endTotalDay.toString():
      // console.log(payload, "endTotalDay");
      return {
        ...state,
        totalDay: { ...state.totalDay, ...payload }
      };
    case endTotalOrders.toString():
      // console.log(payload, "endTotalOrders");
      return {
        ...state,
        totalOrders: { ...state.totalOrders, ...payload }
      };
    case endRemoveDay.toString():
      // console.log(payload, "endRemoveDay");
      return {
        ...initialData()
      };
    case changePays.toString():
      console.log(payload, "changePays");
      return {
        ...state,
        typePays: { ...state.typePays, ...payload }
      };
    case plusPayCount.toString():
      console.log(payload, "plusPayCount");
      return {
        ...state,
        payCount: +payload ? state.payCount + +payload : 0
      };
    case minusPayCount.toString():
      console.log(payload, "minusPayCount");
      return {
        ...state,
        payCount: state.payCount - payload < 0 ? 0 : state.payCount - payload
      };
    default: {
      return state;
    }
  }
};
